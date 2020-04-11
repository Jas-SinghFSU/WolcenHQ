const express = require("express");
const Mongo = require("mongodb");
const _ = require("lodash");
const router = express.Router();
const { getDatabase } = require("../Shared/MongoUtil");
const db = getDatabase();
const BUILDS = db.collection("Builds");
const COMMENTS = db.collection("BuildComments");
const { ensureAuthenticated } = require("../Shared/ensureAuthenticated");

const { ObjectID } = Mongo;

router.get("/fetch", async (req, res) => {
  try {
    const results = await BUILDS.find().toArray();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/build/create", async (req, res) => {
  const inputData = req.body;
  const {
    buildTitle,
    buildDescription,
    buildVideo,
    playstyle,
    combatType,
    activeNodes,
    rotations,
    slotData,
    stats,
    statPoints,
  } = inputData;

  const buildPayload = {
    buildTitle,
    buildDescription: buildDescription || "",
    buildVideo: buildVideo || "",
    playstyle: playstyle || "",
    combatType: combatType || "",
    activeNodes: activeNodes || "",
    rotations: rotations || "",
    slotData: slotData || "",
    stats: stats || "",
    statPoints: statPoints,
    author: !_.isEmpty(res.locals.user) ? res.locals.user[0]._id : null,
    likes: [],
    dislikes: [],
    created: new Date(),
    lastUpdated: new Date(),
    views: 0,
  };

  if (!buildTitle || buildTitle.length <= 0) {
    return res.status(400).json({ error: "Title cannot be empty." });
  }

  try {
    const results = await BUILDS.insertOne(buildPayload);
    res.json({ status: "success", id: results.ops[0]._id });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/build/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const currentBuild = await BUILDS.findOne({ _id: ObjectID(id) });
    res.json(currentBuild);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/build/vote/:id", ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const foundBuild = await BUILDS.findOne({ _id: ObjectID(id) });

    const { likes, dislikes } = foundBuild;

    let isLiked = false;
    let isDisliked = false;

    const userExists = () => {
      return !_.isEmpty(res.locals.user[0]._id);
    };

    if (userExists) {
      isLiked = likes
        .map((like) => like.userID)
        .includes(res.locals.user[0]._id);
      isDisliked = dislikes
        .map((dislike) => dislike.userID)
        .includes(res.locals.user[0]._id);
    }

    if (action === "upvote" && !isLiked) {
      operation = {
        $pull: { dislikes: { userID: res.locals.user[0]._id } },
        $push: { likes: { userID: res.locals.user[0]._id } },
      };
    } else if (action === "downvote" && !isDisliked) {
      operation = {
        $pull: { likes: { userID: res.locals.user[0]._id } },
        $push: { dislikes: { userID: res.locals.user[0]._id } },
      };
    } else {
      operation = {
        $pull: {
          likes: { userID: res.locals.user[0]._id },
          dislikes: { userID: res.locals.user[0]._id },
        },
      };
    }
    const updateStatus = await BUILDS.findOneAndUpdate(
      { _id: ObjectID(id) },
      operation,
      { returnOriginal: false }
    );
    res.json({
      likes: updateStatus.value.likes,
      dislikes: updateStatus.value.dislikes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/build/:id/comment", ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { commentInfo } = req.body;

  if (_.isEmpty(commentInfo)) {
    return res.status(400).json({ error: "Comment cannot be empty." });
  }

  try {
    const commentObject = {
      user: res.locals.user[0]._id,
      buildID: id,
      body: commentInfo,
      likes: [],
      dislikes: [],
      created: new Date(),
      updated: new Date(),
      reports: [],
    };
    const results = await COMMENTS.insertOne(commentObject);

    await BUILDS.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $push: { comments: results.ops[0]._id } },
      { returnOriginal: false }
    );

    res.json({ status: "success" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/build/:id/comment", ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { commentInfo } = req.body;

  try {
    const foundComment = await COMMENTS.findOne({ _id: ObjectID(id) });

    if (_.isEmpty(foundComment)) {
      return res.status(404).json({ error: "Comment not found." });
    } else if (foundComment.user !== res.locals.user[0]._id) {
      return res
        .status(400)
        .json({ error: "You can only edit your own comments." });
    }

    if (_.isEmpty(commentInfo)) {
      return res.status(400).json({ error: "Comment cannot be empty." });
    }

    const newComment = await COMMENTS.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { body: commentInfo, update: new Date() } },
      { returnOriginal: false }
    );

    res.json({ status: "success", updateComment: newComment.value });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/build/:id/comment", ensureAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const foundComment = await COMMENTS.findOne({ _id: ObjectID(id) });
    if (foundComment.user !== res.locals.user[0]._id) {
      return res
        .status(400)
        .json({ error: "You can only delete your own comments." });
    }
    await COMMENTS.deleteOne({ _id: ObjectID(id) });

    res.json({ status: "success" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/build/:id/comment/page", async (req, res) => {
  const { id } = req.params;
  const { page } = req.body;

  try {
    const buildComments = await COMMENTS.find(
      { buildID: id },
      { sort: { created: -1 } }
    )
      .skip((page - 1) * 10)
      .limit(10)
      .toArray();

    const totalComments = await COMMENTS.find({ buildID: id }).count();

    res.json({
      status: "success",
      comments: buildComments,
      total: totalComments,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/build/:id/comment/vote", ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const foundComment = await COMMENTS.findOne({ _id: ObjectID(id) });

    const { likes, dislikes } = foundComment;

    let isLiked = false;
    let isDisliked = false;

    const userExists = () => {
      return !_.isEmpty(res.locals.user[0]._id);
    };

    if (userExists) {
      isLiked = likes
        .map((like) => like.userID)
        .includes(res.locals.user[0]._id);
      isDisliked = dislikes
        .map((dislike) => dislike.userID)
        .includes(res.locals.user[0]._id);
    }

    if (action === "upvote" && !isLiked) {
      operation = {
        $pull: { dislikes: { userID: res.locals.user[0]._id } },
        $push: { likes: { userID: res.locals.user[0]._id } },
      };
    } else if (action === "downvote" && !isDisliked) {
      operation = {
        $pull: { likes: { userID: res.locals.user[0]._id } },
        $push: { dislikes: { userID: res.locals.user[0]._id } },
      };
    } else {
      operation = {
        $pull: {
          likes: { userID: res.locals.user[0]._id },
          dislikes: { userID: res.locals.user[0]._id },
        },
      };
    }
    const updateStatus = await COMMENTS.findOneAndUpdate(
      { _id: ObjectID(id) },
      operation,
      { returnOriginal: false }
    );
    res.json({
      likes: updateStatus.value.likes,
      dislikes: updateStatus.value.dislikes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

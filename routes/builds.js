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
    res.status(500).send(err);
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
    statPoints
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
    views: 0
  };

  if (!buildTitle || buildTitle.length <= 0) {
    return res.status(400).json({ error: "Title cannot be empty." });
  }

  try {
    const results = await BUILDS.insertOne(buildPayload);
    res.json({ status: "success", id: results.ops[0]._id });
  } catch (err) {
    res.status(500).send(err);
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
      isLiked = likes.map(like => like.userID).includes(res.locals.user[0]._id);
      isDisliked = dislikes
        .map(dislike => dislike.userID)
        .includes(res.locals.user[0]._id);
    }

    if (action === "upvote" && !isLiked) {
      operation = {
        $pull: { dislikes: { userID: res.locals.user[0]._id } },
        $push: { likes: { userID: res.locals.user[0]._id } }
      };
    } else if (action === "downvote" && !isDisliked) {
      operation = {
        $pull: { likes: { userID: res.locals.user[0]._id } },
        $push: { dislikes: { userID: res.locals.user[0]._id } }
      };
    } else {
      operation = {
        $pull: {
          likes: { userID: res.locals.user[0]._id },
          dislikes: { userID: res.locals.user[0]._id }
        }
      };
    }
    const updateStatus = await BUILDS.findOneAndUpdate(
      { _id: ObjectID(id) },
      operation,
      { returnOriginal: false }
    );
    res.json({
      likes: updateStatus.value.likes,
      dislikes: updateStatus.value.dislikes
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
      body: commentInfo,
      likes: [],
      dislikes: [],
      created: new Date(),
      updated: new Date(),
      reports: []
    };

    try {
      const results = await COMMENTS.insertOne(commentObject);
      res.json({ status: "success", id: results.ops[0]._id });
    } catch (err) {
      res.status(500).send(err);
    }
  } catch (error) {}
});

module.exports = router;

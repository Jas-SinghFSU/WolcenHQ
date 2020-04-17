const express = require("express");
const Mongo = require("mongodb");
const _ = require("lodash");
const router = express.Router();
const { getDatabase } = require("../Shared/MongoUtil");
const db = getDatabase();
const BUILDS = db.collection("Builds");
const COMMENTS = db.collection("BuildComments");
const USERS = db.collection("Users");
const { ensureAuthenticated } = require("../Shared/ensureAuthenticated");

const { ObjectID } = Mongo;

router.post("/fetch", async (req, res) => {
  const {
    page,
    limit,
    sortBy,
    sortType,
    filter,
    searchValue,
    playstyle,
    combatType,
    timeFilter,
  } = req.body;

  const sortTypeVal = sortType === "descending" || _.isEmpty(sortType) ? -1 : 1;

  const sortByFilter =
    _.isEmpty(sortBy) || _.isEmpty(sortType) ? "lastUpdated" : sortBy;

  const filterVal = _.isEmpty(filter) ? "buildTitle" : filter;

  let searchVal = _.isEmpty(searchValue) ? "" : searchValue;

  const playstyleVal =
    playstyle === "all" || _.isEmpty(playstyle)
      ? { playstyle: { $regex: "", $options: "i" } }
      : { playstyle };

  const combatTypeVal =
    combatType === "all" || _.isEmpty(combatType)
      ? { combatType: { $regex: "", $options: "i" } }
      : { combatType };

  const timeFilterVal =
    timeFilter === "daily"
      ? { created: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
      : timeFilter === "weekly"
      ? { created: { $gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
      : timeFilter === "monthly"
      ? { created: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }
      : timeFilter === "yearly"
      ? { created: { $gt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } }
      : { created: { $exists: true } };

  let sortObj = { sort: { [sortByFilter]: sortTypeVal } };

  try {
    let builds;
    let totalBuilds;

    if (filter === "author") {
      const foundUsers = await USERS.find({
        displayName: { $regex: searchVal, $options: "i" },
      }).toArray();

      const filteredUsers = foundUsers.map((user) => {
        return user._id.toString();
      });

      if (sortByFilter === "votes") {
        builds = await BUILDS.aggregate([
          {
            $match: {
              author: { $in: filteredUsers },
              ...combatTypeVal,
              ...playstyleVal,
              ...timeFilterVal,
            },
          },
          {
            $addFields: {
              voteRatio: {
                $subtract: [
                  {
                    $size: "$likes",
                  },
                  {
                    $size: "$dislikes",
                  },
                ],
              },
            },
          },
          {
            $sort: {
              voteRatio: sortTypeVal,
            },
          },
        ])
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray();
      } else {
        builds = await BUILDS.find(
          {
            author: { $in: filteredUsers },
            ...combatTypeVal,
            ...playstyleVal,
            ...timeFilterVal,
          },
          sortObj
        )
          .collation({ locale: "en_US", numericOrdering: true })
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray();
      }

      totalBuilds = await BUILDS.find({
        author: { $in: filteredUsers },
        ...combatTypeVal,
        ...playstyleVal,
      }).count();
    }

    if (filter === "buildTitle") {
      if (sortByFilter === "votes") {
        builds = await BUILDS.aggregate([
          {
            $match: {
              buildTitle: new RegExp(searchVal, "i"),
              ...combatTypeVal,
              ...playstyleVal,
              ...timeFilterVal,
            },
          },
          {
            $addFields: {
              voteRatio: {
                $subtract: [
                  {
                    $size: "$likes",
                  },
                  {
                    $size: "$dislikes",
                  },
                ],
              },
            },
          },
          {
            $sort: {
              voteRatio: sortTypeVal,
            },
          },
        ])
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray();
      } else {
        builds = await BUILDS.find(
          {
            [filterVal]: { $regex: searchVal, $options: "i" },
            ...combatTypeVal,
            ...playstyleVal,
            ...timeFilterVal,
          },
          sortObj
        )
          .collation({ locale: "en_US", numericOrdering: true })
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray();
      }

      totalBuilds = await BUILDS.find({
        [filterVal]: { $regex: searchVal, $options: "i" },
        ...combatTypeVal,
        ...playstyleVal,
      }).count();
    }
    res.json({
      status: "success",
      builds,
      total: totalBuilds,
    });
  } catch (error) {
    res.status(500).send(error.message);
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
    author: !_.isEmpty(res.locals.user) ? res.locals.user[0]._id : "Anonymous",
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
      { $set: { body: commentInfo, updated: new Date() } },
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

const func = () => {
  const a = {
    $switch: {
      branches: [
        {
          case: { $eq: [{ $size: "$dislikes" }, 0] },
          then: { $divide: [{ $size: "$likes" }, 1] },
        },
        {
          case: { $eq: [{ $size: "$likes" }, 0] },
          then: { $divide: [{ $size: "$dislikes" }, -1] },
        },
      ],
      default: { $divide: [{ $size: "$likes" }, { $size: "$dislikes" }] },
    },
  };
  /**
   * newField: The new field name.
   * expression: The new field expression.
   */
  // {
  //   voteRatio: {
  //     $cond: [
  //       { $eq: [{ $size: "$dislikes" }, 0] },
  //       { $divide: [{ $size: "$likes" }, 1] },
  //       { $divide: [{ $size: "$likes" }, { $size: "$dislikes" }] },
  //     ];
  //   }
  // }
};

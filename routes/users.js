const express = require("express");
const router = express.Router();
const Mongo = require("mongodb");
const { getDatabase } = require("../Shared/MongoUtil");
const db = getDatabase();
const USERS = db.collection("Users");
const BUILDS = db.collection("Builds");
const { ensureAuthenticated } = require("../Shared/ensureAuthenticated");
const _ = require("lodash");

const { ObjectID } = Mongo;

router.get("/user/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const currentUser = await USERS.findOne({ _id: ObjectID(id) });
    delete currentUser["password"];
    delete currentUser["email"];
    res.json(currentUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/self", ensureAuthenticated, async function (req, res) {
  const userData = res.locals.user[0];

  const { page, limit, sortBy, sortType, buildType } = req.body;

  const sortTypeVal = sortType === "descending" || _.isEmpty(sortType) ? -1 : 1;

  const sortByFilter =
    _.isEmpty(sortBy) || _.isEmpty(sortType) ? "lastUpdated" : sortBy;

  const queryObject =
    buildType === "created"
      ? { author: userData._id }
      : { likes: { $elemMatch: { userID: userData._id.toString() } } };

  let sortObj = { sort: { [sortByFilter]: sortTypeVal } };

  try {
    let builds;
    const buildsTotal = await BUILDS.find(queryObject).count();

    if (sortByFilter === "votes") {
      builds = await BUILDS.aggregate([
        {
          $match: queryObject,
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
      builds = await BUILDS.find(queryObject, sortObj)
        .collation({ locale: "en_US", numericOrdering: true })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
    }

    res.json({
      builds,
      total: buildsTotal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/self/totals", ensureAuthenticated, async function (req, res) {
  const userData = res.locals.user[0];

  try {
    const likedBuildsTotal = await BUILDS.find({
      likes: { $elemMatch: { userID: userData._id.toString() } },
    }).count();

    const createdBuildsTotal = await BUILDS.find({
      author: userData._id,
    }).count();

    res.json({
      liked: likedBuildsTotal,
      created: createdBuildsTotal,
      userData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

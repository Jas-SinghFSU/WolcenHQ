const express = require("express");
const Mongo = require("mongodb");
const _ = require("lodash");
const router = express.Router();
const { getDatabase } = require("../Shared/MongoUtil");
const db = getDatabase();
const BUILDS = db.collection("Builds");

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

  console.log(res.locals.user);

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
    statPoints: statPoints || "",
    author: !_.isEmpty(res.locals.user) ? res.locals.user[0]._id : null,
    likes: [],
    dislikes: [],
    created: "",
    lastUpdated: "",
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

module.exports = router;

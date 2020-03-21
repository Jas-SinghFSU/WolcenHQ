const express = require("express");
const router = express.Router();
const { getDatabase } = require("../Shared/MongoUtil");
const db = getDatabase();
const BUILDS = db.collection("Builds");

router.get("/", async (req, res) => {
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
    statPoints: statPoints || "",
    author: "",
    likes: [],
    dislikes: [],
    created: "",
    lastUpdated: "",
    views: 0
  };

  if (buildTitle.length <= 0) {
    return res.send({
      status: "fail",
      response: "Title can not be empty."
    });
  }
  console.log(inputData);
  try {
    const results = await BUILDS.insertOne(buildPayload);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

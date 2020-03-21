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
  console.log(inputData);
  console.log(JSON.stringify(inputData.input, null, 2));
  try {
    const results = await BUILDS.find().toArray();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

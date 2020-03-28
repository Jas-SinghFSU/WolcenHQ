const express = require("express");
const router = express.Router();
const Mongo = require("mongodb");
const { getDatabase } = require("../Shared/MongoUtil");
const db = getDatabase();
const USERS = db.collection("Users");

const { ObjectID } = Mongo;

router.get("/user/:id", async function(req, res) {
  const { id } = req.params;
  try {
    const currentUser = await USERS.findOne({ _id: ObjectID(id) });
    res.json(currentUser);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");
const { rssFeedUrl } = require("../Config/default.json");

router.get("/news", async (req, res) => {
  try {
    const newsData = await axios.get(rssFeedUrl);
    res.send(newsData.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

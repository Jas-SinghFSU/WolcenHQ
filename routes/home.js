const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(`Hello! Let's get some data`);
});

module.exports = router;

const express = require("express");
const redis = require("../redis");
const router = express.Router();

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  let counter = await redis.getAsync("counter");
  counter = counter ? parseInt(counter) : 0;
  res.status(200).json({
    added_todos: counter,
  });
});

module.exports = router;

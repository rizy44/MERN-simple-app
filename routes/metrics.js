const express = require("express");
const router = express.Router();

const { register } = require("../middleware/metrics");

router.get("/", async (req, res) => {
  res.set("Content-Type", register.contentType);
  const metrics = await register.metrics();
  res.status(200).send(metrics);
});

module.exports = router;

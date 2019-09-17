const express = require("express");
const router = express.Router();
const { simulateNetworkLatency } = require("../util/network-helper");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Progressive Rendering" });
});

/* GET app.js */
router.get("/boo/app.js", async function(req, res, next) {
  await simulateNetworkLatency(10);
  res.send("");
});

module.exports = router;

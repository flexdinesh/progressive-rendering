const express = require("express");
const router = express.Router();
const { Readable } = require("stream");
const npRenderer = require("../renderer/newspaper-renderer");
const {
  simulateNetworkLatency,
  SIMULATED_RENDER_LATENCY
} = require("../util/network-helper");

const allLatencies = [
  SIMULATED_RENDER_LATENCY.COLUMN_ONE_LATENCY,
  SIMULATED_RENDER_LATENCY.COLUMN_TWO_LATENCY,
  SIMULATED_RENDER_LATENCY.COLUMN_THREE_LATENCY,
  SIMULATED_RENDER_LATENCY.COLUMN_FOUR_LATENCY,
  SIMULATED_RENDER_LATENCY.COLUMN_FIVE_LATENCY
];
// const TOTAL_RENDER_LATENCY = Math.max(allLatencies) + Math.min(allLatencies);
const TOTAL_RENDER_LATENCY = allLatencies.reduce((a, b) => a + b, 0);

/* GET newspaper page. */
router.get("/", async function(req, res, next) {
  console.log('/ latency=', TOTAL_RENDER_LATENCY)
  await simulateNetworkLatency(TOTAL_RENDER_LATENCY);
  res.render("newspaper");
});

router.get("/stream", async function(req, res, next) {
  res.status(200);
  res.type("text/html; charset=utf-8");

  const DOCTYPE = await npRenderer.DOCTYPE();
  const openHTML = await npRenderer.openHTML();
  const head = await npRenderer.head();
  const openBody = await npRenderer.openBody();

  res.write(`${DOCTYPE}${openHTML}`);
  res.write(head);
  res.write(openBody);

  const pageChunks = [
    npRenderer.header,
    npRenderer.contentOpen,
    npRenderer.columnsOpen,
    npRenderer.columnOne,
    npRenderer.columnTwo,
    npRenderer.columnThree,
    npRenderer.columnFour,
    npRenderer.columnFive,
    npRenderer.columnsClose,
    npRenderer.contentClose,
    npRenderer.closeBody,
    npRenderer.closeHTML
  ];

  const pageStream = new Readable({
    async read(size) {
      if (!pageChunks.length) {
        pageStream.push(null);
      } else {
        const chunkToRender = pageChunks.shift();
        const renderedChunk = await chunkToRender();
        pageStream.push(renderedChunk);
      }
    }
  });

  pageStream.pipe(res);
});

module.exports = router;

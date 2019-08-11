const {
  simulateNetworkLatency,
  SIMULATED_RENDER_LATENCY
} = require("../util/network-helper");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

async function readHTMLString(filepath) {
  return await readFile(filepath);
}

module.exports = {
  DOCTYPE: async () =>
    await readHTMLString(__dirname + "/../views/partials/1-DOCTYPE.html"),
  openHTML: async () =>
    await readHTMLString(__dirname + "/../views/partials/2-openHTML.html"),
  head: async () =>
    await readHTMLString(
      __dirname + "/../views/partials/3-head-progressive.html"
    ),
  openBody: async () =>
    await readHTMLString(__dirname + "/../views/partials/4-openBody.html"),
  header: async () =>
    await readHTMLString(__dirname + "/../views/partials/5-header.html"),
  contentOpen: async () =>
    await readHTMLString(__dirname + "/../views/partials/6-contentOpen.html"),
  columnsOpen: async () =>
    await readHTMLString(__dirname + "/../views/partials/7-columnsOpen.html"),
  columnOne: async () => {
    await simulateNetworkLatency(SIMULATED_RENDER_LATENCY.COLUMN_ONE_LATENCY);
    return await readHTMLString(
      __dirname + "/../views/partials/8-columnOne.html"
    );
  },
  columnTwo: async () => {
    await simulateNetworkLatency(SIMULATED_RENDER_LATENCY.COLUMN_TWO_LATENCY);
    return await readHTMLString(
      __dirname + "/../views/partials/9-columnTwo.html"
    );
  },
  columnThree: async () => {
    await simulateNetworkLatency(SIMULATED_RENDER_LATENCY.COLUMN_THREE_LATENCY);
    return await readHTMLString(
      __dirname + "/../views/partials/10-columnThree.html"
    );
  },
  columnFour: async () => {
    await simulateNetworkLatency(SIMULATED_RENDER_LATENCY.COLUMN_FOUR_LATENCY);
    return await readHTMLString(
      __dirname + "/../views/partials/11-columnFour.html"
    );
  },
  columnFive: async () => {
    await simulateNetworkLatency(SIMULATED_RENDER_LATENCY.COLUMN_FIVE_LATENCY);
    return await readHTMLString(
      __dirname + "/../views/partials/12-columnFive.html"
    );
  },
  columnsClose: async () =>
    await readHTMLString(__dirname + "/../views/partials/13-columnsClose.html"),
  contentClose: async () =>
    await readHTMLString(__dirname + "/../views/partials/14-contentClose.html"),
  closeBody: async () =>
    await readHTMLString(__dirname + "/../views/partials/15-closeBody.html"),
  closeHTML: async () =>
    await readHTMLString(__dirname + "/../views/partials/16-closeHTML.html")
};

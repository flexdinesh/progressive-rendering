const LATENCY_FACTOR = 5;

const COLUMN_ONE_LATENCY = 200;
const COLUMN_TWO_LATENCY = 200;
const COLUMN_THREE_LATENCY = 100;
const COLUMN_FOUR_LATENCY = 300;
const COLUMN_FIVE_LATENCY = 400;

const simulateNetworkLatency = async function(
  ms = 100,
  latency = LATENCY_FACTOR
) {
  const latencyMS = ms * latency;

  return await new Promise(resolve => {
    let waitT = setTimeout(() => {
      clearTimeout(waitT);
      resolve();
    }, latencyMS);
  });
};

const getRandomMS = function(min = 10, max = 300) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  simulateNetworkLatency,
  getRandomMS,
  SIMULATED_RENDER_LATENCY: {
    COLUMN_ONE_LATENCY,
    COLUMN_TWO_LATENCY,
    COLUMN_THREE_LATENCY,
    COLUMN_FOUR_LATENCY,
    COLUMN_FIVE_LATENCY
  }
};

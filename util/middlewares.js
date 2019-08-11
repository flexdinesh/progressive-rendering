const { simulateNetworkLatency } = require("./network-helper");

const DEFAULT_LATENCY_MS = 300;

const simulatedLatencyMiddleware = async function(req, res, next) {
  await simulateNetworkLatency(DEFAULT_LATENCY_MS);
  next();
};

const noCacheMiddleware = function(req, res, next) {
  res.set("Cache-Control", "no-cache");
  next();
};

const errorHandlerMiddleware = function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};

module.exports = {
  simulatedLatencyMiddleware,
  noCacheMiddleware,
  errorHandlerMiddleware
};

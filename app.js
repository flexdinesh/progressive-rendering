const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const {
  simulatedLatencyMiddleware,
  errorHandlerMiddleware
} = require("./util/middlewares");

const indexRouter = require("./routes/index");
const newspaperRouter = require("./routes/newspaper");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* simulated network latency 300ms */
app.use(simulatedLatencyMiddleware);

app.use("/", indexRouter);
app.use("/newspaper", newspaperRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandlerMiddleware);

module.exports = app;

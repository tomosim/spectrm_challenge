const express = require("express");
const apiRouter = require("./routes/api.router");

const app = express();

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

module.exports = app;

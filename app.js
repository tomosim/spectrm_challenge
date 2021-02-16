const express = require("express");
const apiRouter = require("./routes/api.router");
const { handleCustomErrors, handlePSQLErrors } = require("./error_handlers");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);

app.use(handlePSQLErrors);

app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

module.exports = app;

const apiRouter = require("express").Router();
const messagesRouter = require("./messages.router");

apiRouter.use("/messages", messagesRouter);

module.exports = apiRouter;

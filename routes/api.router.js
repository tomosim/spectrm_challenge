const apiRouter = require("express").Router();
const messagesRouter = require("./messages.router");
const sendEndpoints = require("../controllers/api.controllers");

apiRouter.get("/", sendEndpoints);
apiRouter.use("/messages", messagesRouter);

module.exports = apiRouter;

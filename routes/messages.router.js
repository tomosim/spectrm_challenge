const messagesRouter = require("express").Router();
const { sendMessages } = require("../controllers/messages.controllers");

messagesRouter.route("/").get(sendMessages);

module.exports = messagesRouter;

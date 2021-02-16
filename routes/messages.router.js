const messagesRouter = require("express").Router();
const {
  sendMessages,
  addMessage,
} = require("../controllers/messages.controllers");

messagesRouter.route("/").get(sendMessages).post(addMessage);

module.exports = messagesRouter;

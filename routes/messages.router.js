const messagesRouter = require("express").Router();
const {
  sendMessages,
  addMessage,
  sendSingleMessage,
  patchSingleMessage,
} = require("../controllers/messages.controllers");

messagesRouter.route("/").get(sendMessages).post(addMessage);
messagesRouter
  .route("/:message_id")
  .get(sendSingleMessage)
  .patch(patchSingleMessage);

module.exports = messagesRouter;

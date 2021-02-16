const messagesRouter = require("express").Router();
const {
  sendMessages,
  addMessage,
  sendSingleMessage,
  patchSingleMessage,
  removeSingleMessage,
} = require("../controllers/messages.controllers");

messagesRouter.route("/").get(sendMessages).post(addMessage);
messagesRouter
  .route("/:message_id")
  .get(sendSingleMessage)
  .patch(patchSingleMessage)
  .delete(removeSingleMessage);

module.exports = messagesRouter;

const messagesRouter = require("express").Router();
const {
  sendMessages,
  addMessage,
  sendMessage,
  patchMessage,
  removeMessage,
} = require("../controllers/messages.controllers");

messagesRouter.route("/").get(sendMessages).post(addMessage);
messagesRouter
  .route("/:message_id")
  .get(sendMessage)
  .patch(patchMessage)
  .delete(removeMessage);

module.exports = messagesRouter;

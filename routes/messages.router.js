const messagesRouter = require("express").Router();
const {
  sendMessages,
  addMessage,
  sendMessage,
  patchMessage,
  removeMessage,
} = require("../controllers/messages.controllers");

const { containsHTML, hasNoContent } = require("../error_handlers");

messagesRouter
  .route("/")
  .get(sendMessages)
  .post(containsHTML, hasNoContent, addMessage);
messagesRouter
  .route("/:message_id")
  .get(sendMessage)
  .patch(containsHTML, hasNoContent, patchMessage)
  .delete(removeMessage);

module.exports = messagesRouter;

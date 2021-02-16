const messagesRouter = require("express").Router();
const {
  sendMessages,
  addMessage,
  sendMessage,
  patchMessage,
  removeMessage,
} = require("../controllers/messages.controllers");

const { containsHTML } = require("../error_handlers");

messagesRouter.route("/").get(sendMessages).post(containsHTML, addMessage);
messagesRouter
  .route("/:message_id")
  .get(sendMessage)
  .patch(containsHTML, patchMessage)
  .delete(removeMessage);

module.exports = messagesRouter;

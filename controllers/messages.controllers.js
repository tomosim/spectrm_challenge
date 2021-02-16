const {
  selectMessages,
  insertMessage,
  selectMessage,
  updateMessage,
  deleteMessage,
} = require("../models/messages.models.js");

exports.sendMessages = (req, res, next) => {
  selectMessages()
    .then((messages) => {
      res.send({ messages });
    })
    .catch(next);
};

exports.addMessage = (req, res, next) => {
  const newMessage = req.body;
  insertMessage(newMessage)
    .then((message) => {
      res.status(201).send({ message });
    })
    .catch(next);
};

exports.sendMessage = (req, res, next) => {
  const { message_id } = req.params;
  selectMessage(message_id)
    .then((message) => {
      res.send({ message });
    })
    .catch(next);
};

exports.patchMessage = (req, res, next) => {
  const { content } = req.body;
  const { message_id } = req.params;
  updateMessage(message_id, content)
    .then((message) => {
      res.send({ message });
    })
    .catch(next);
};

exports.removeMessage = (req, res, next) => {
  const { message_id } = req.params;
  deleteMessage(message_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

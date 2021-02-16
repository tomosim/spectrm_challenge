const {
  selectMessages,
  insertMessage,
  selectSingleMessage,
  updateSingleMessage,
  deleteSingleMessage,
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

exports.sendSingleMessage = (req, res, next) => {
  const { message_id } = req.params;
  selectSingleMessage(message_id)
    .then((message) => {
      res.send({ message });
    })
    .catch(next);
};

exports.patchSingleMessage = (req, res, next) => {
  const { content } = req.body;
  const { message_id } = req.params;
  updateSingleMessage(message_id, content)
    .then((message) => {
      res.send({ message });
    })
    .catch(next);
};

exports.removeSingleMessage = (req, res, next) => {
  const { message_id } = req.params;
  deleteSingleMessage(message_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

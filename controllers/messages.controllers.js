const {
  selectMessages,
  insertMessage,
  selectSingleMessage,
  updateSingleMessage,
} = require("../models/messages.models.js");

exports.sendMessages = (req, res) => {
  selectMessages()
    .then((messages) => {
      res.send({ messages });
    })
    .catch(console.log);
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

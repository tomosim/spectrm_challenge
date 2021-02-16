const {
  selectMessages,
  insertMessage,
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

const { selectMessages } = require("../models/messages.models.js");

exports.sendMessages = (req, res) => {
  selectMessages()
    .then((messages) => {
      res.send({ messages });
    })
    .catch(console.log);
};

const connection = require("../db/connection");

exports.selectMessages = () => {
  return connection("messages").select("*");
};

exports.insertMessage = (message) => {
  return connection("messages")
    .insert(message)
    .returning("*")
    .then(([message]) => message);
};

exports.selectMessage = (id) => {
  return connection("messages")
    .increment("retrieval_count")
    .where({ id }) // Not a fan of multiple queries to the DB here but I'm unsure of how else to achieve this.
    .then(() => {
      return connection("messages").first("*").where({ id });
    })
    .then((message) => {
      if (message === undefined) {
        return Promise.reject({ status: 404, msg: "Message not found" });
      } else return message;
    });
};

exports.updateMessage = (id, content) => {
  return connection("messages")
    .where({ id })
    .update({ content })
    .returning("*")
    .then(([message]) => {
      if (message === undefined) {
        return Promise.reject({ status: 404, msg: "Message not found" });
      } else return message;
    });
};

exports.deleteMessage = (id) => {
  return connection("messages")
    .where({ id })
    .delete()
    .then((rows) => {
      if (rows === 0) {
        return Promise.reject({ status: 404, msg: "Message not found" });
      } else return;
    });
};

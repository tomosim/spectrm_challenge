const { connect } = require("../app");
const connection = require("../db/connection");

exports.selectMessages = () => {
  return connection("messages").select("*");
};

exports.insertMessage = (message) => {
  const htmlTag = /<.+?>/;
  if (htmlTag.test(message.content) === true) {
    return Promise.reject({
      msg: "Message cannot contain HTML tags",
      status: 400,
    });
  } else
    return connection("messages")
      .insert(message)
      .returning("*")
      .then((messages) => messages[0]);
};

exports.selectSingleMessage = (id) => {
  return connection("messages")
    .increment("retrieval_count") // Not a fan of multiple queries to the DB here but I'm unsure of how else to achieve this.
    .then(() => {
      return connection("messages").first("*").where({ id });
    })
    .then((message) => {
      if (message === undefined) {
        return Promise.reject({ status: 404, msg: "Message not found" });
      } else return message;
    });
};

exports.updateSingleMessage = (id, content) => {
  return connection("messages")
    .where({ id })
    .update({ content })
    .returning("*")
    .then((messages) => messages[0]);
};

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

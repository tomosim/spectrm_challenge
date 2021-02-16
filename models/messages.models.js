const connection = require("../db/connection");

exports.selectMessages = () => {
  return connection("messages").select("*");
};

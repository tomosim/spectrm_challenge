const messages = require("../data");

exports.seed = function (knex) {
  return knex("messages").insert(messages);
};

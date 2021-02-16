const ENV = process.env.NODE_ENV || "development";

const data = {
  development: require("./messages_dev.json"),
  test: require("./messages_test.json"),
};

module.exports = data[ENV];

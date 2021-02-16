const endpoints = require("../endpoints.json");

const sendEndpoints = (req, res) => {
  res.send({ endpoints });
};

module.exports = sendEndpoints;

const { fetchTopics } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  console.log("inside Topics controller");
  fetchTopics()
    .then((topic) => {
      res.status(200).send(topic);
    })
    .catch((err) => {
      next(err);
    });
};

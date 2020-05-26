const { fetchTopics, addNewArticle } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topic) => {
      res.status(200).send({ topics: topic });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewArticle = (req, res, next) => {
  const { body } = req;

  addNewArticle(body)
    .then((article) => {
      res.status(201).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

const {
  fetchArticlesById,
  updateArticlesById,
} = require("../models/articles.model");

exports.getArticlesById = (req, res, next) => {
  // console.log("inside articles controller");
  const { article_id } = req.params;
  fetchArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};
exports.patchArticlesById = (req, res, next) => {
  console.log("inside articles controller");
  const { article_id } = req.params;
  const { body } = req;
  updateArticlesById(article_id, body).then((update) => {
    res.status(201).send(update);
  });
};

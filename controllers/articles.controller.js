const { fetchArticlesById } = require("../models/articles.model");

exports.getArticlesById = (req, res, next) => {
  console.log("inside articles controller");
  const { article_id } = req.params;
  fetchArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

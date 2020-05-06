const {
  fetchArticlesById,
  updateArticlesById,
  fetchCommentsByArticle,
  addCommentByArticle,
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
  // console.log("inside articles controller");
  const { article_id } = req.params;
  const { body } = req;
  updateArticlesById(article_id, body).then((update) => {
    res.status(201).send(update);
  });
};

exports.getCommentsByArticle = (req, res, next) => {
  // console.log("inside articles controller");
  const { article_id } = req.params;
  fetchCommentsByArticle(article_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentsByArticle = (req, res, next) => {
  console.log("inside articles controller");
  const { article_id } = req.params;
  const { body } = req;
  console.log(body, "BODY");
  addCommentByArticle(article_id, body).then((comment) => {
    console.log(comment, "COMMENT");
    res.status(201).send({ "new comment": comment });
  });
};

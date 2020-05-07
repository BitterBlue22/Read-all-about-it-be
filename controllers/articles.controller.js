const {
  fetchArticlesById,
  updateArticlesById,
  fetchCommentsByArticle,
  addCommentByArticle,
  fetchAllArticles,
} = require("../models/articles.model");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchAllArticles(sort_by, order, author, topic)
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch((err) => next(err));
};

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
  updateArticlesById(article_id, body)
    .then((update) => {
      res.status(201).send(update);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticle = (req, res, next) => {
  // console.log("inside articles controller");
  const { article_id } = req.params;
  fetchCommentsByArticle(article_id, req.query.order, req.query.sort_by)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentsByArticle = (req, res, next) => {
  // console.log("inside articles controller");
  const { article_id } = req.params;
  const { body } = req;

  addCommentByArticle(article_id, body)
    .then((comment) => {
      comment[0].author = body.username;
      res.status(201).send({ new_comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};

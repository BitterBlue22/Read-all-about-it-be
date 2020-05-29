const {
  fetchArticlesById,
  updateArticlesById,
  fetchCommentsByArticle,
  addCommentByArticle,
  fetchAllArticles,
  addNewArticle,
  updateArticleVotesById,
} = require("../models/articles.model");
const { fetchUsersById } = require("../models/users.model");
const { fetchTopicsBySlug } = require("../models/topics.model");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic, limit } = req.query;
  const queries = [fetchAllArticles(sort_by, order, author, topic, limit)];
  if (author) queries.push(fetchUsersById(author));
  if (topic) queries.push(fetchTopicsBySlug(topic));
  Promise.all(queries)
    .then((articles) => {
      res.status(200).send({ articles: articles[0] });
    })
    .catch((err) => next(err));
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article: article[0] });
    })
    .catch((err) => {
      next(err);
    });
};
exports.patchArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  updateArticlesById(article_id, body)
    .then((article) => {
      res.status(201).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
}; //!not in use
exports.patchArticleVotesById = (req, res, next) => {
  const { body } = req;
  const { article_id } = req.params;

  updateArticleVotesById(article_id, body)
    .then((article) => {
      res.status(201).send({ article: article[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticle = (req, res, next) => {
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
  const { article_id } = req.params;
  const { body } = req;

  addCommentByArticle(article_id, body)
    .then((comment) => {
      console.log(comment);
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};

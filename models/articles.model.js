const connection = require("../db/connection");

exports.fetchArticlesById = (id) => {
  return connection
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .where("articles.article_id", id)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .then((article) => {
      if (article.length === 0)
        return Promise.reject({ status: 404, msg: "not found" });
      return article;
    });
};

exports.updateArticlesById = (id, updatedInfo) => {
  return connection("articles")
    .returning("*")
    .where("article_id", id)
    .update(updatedInfo)
    .then((updated) => {
      return updated;
    });
};

exports.fetchCommentsByArticle = (id, order, sort_by) => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", id)
    .orderBy(sort_by || "created_at", order || "desc")
    .returning("*")
    .then((comments) => {
      return comments;
    });
};

exports.addCommentByArticle = (id, comment) => {
  const { body, username } = comment;

  const newComment = {
    article_id: id,
    body: body,
    created_at: new Date(Date.now()),
    votes: 0,
    author: username,
  };
  return connection("comments")
    .insert(newComment)
    .where("article_id", id)
    .returning("*")
    .then((comment) => {
      return comment;
    });
};

exports.fetchAllArticles = (sort_by, order, author, topic, limit) => {
  return connection
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .limit(limit || 10)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify((query) => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    })
    .groupBy("articles.article_id")
    .then((articles) => {
      return articles;
    });
};

exports.updateArticleVotesById = (id, updatedInfo) => {
  const { inc_votes } = updatedInfo;

  return connection("articles")
    .returning("*")
    .where("article_id", id)

    .increment("votes", inc_votes)

    .then((updated) => {
      return updated;
    });
};

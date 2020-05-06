const connection = require("../db/connection");

exports.fetchArticlesById = (id) => {
  // console.log("inside articles model");
  return connection
    .select("articles.*")
    .count("comments.article_id as comment_count")
    .from("articles")
    .where("articles.article_id", id)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .then((article) => {
      return article;
    });
};

exports.updateArticlesById = (id, updatedInfo) => {
  // console.log("inside articles model");
  return connection("articles")
    .returning("*")
    .where("article_id", id)
    .update(updatedInfo)
    .then((updated) => {
      return updated;
    });
};

exports.fetchCommentsByArticle = (id, order, sort_by) => {
  // console.log("inside articles model");
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
  // console.log("inside articles model");
  const { body } = comment;
  const newComment = {
    article_id: id,
    body: body,
    created_at: new Date(Date.now()),
    votes: 0,
  };
  return connection("comments")
    .insert(newComment)
    .where("article_id", id)
    .returning("*")
    .then((post) => {
      return post;
    });
};

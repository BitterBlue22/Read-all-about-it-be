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
  console.log("inside articles model");
  return connection("articles")
    .returning("*")
    .where("article_id", id)
    .update(updatedInfo)
    .then((updated) => {
      return updated;
    });
};

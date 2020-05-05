const connection = require("../db/connection");

exports.fetchArticlesById = (id) => {
  console.log("inside articles model");
  return connection
    .select("*")
    .from("articles")
    .where("article_id", id)
    .then((article) => {
      return article;
    });
};

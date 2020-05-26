const connection = require("../db/connection");

exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then((topics) => {
      if (topics === 0)
        return Promise.reject({ status: 404, msg: "topic not found" });
      return topics;
    });
};

exports.fetchTopicsBySlug = (slug) => {
  return connection
    .select("*")
    .where("slug", slug)
    .from("topics")
    .then((topic) => {
      if (topic[0] === undefined)
        return Promise.reject({ status: 404, msg: "topic not found" });
      return topic;
    });
};

exports.addNewArticle = ({ title, topic, username, body }) => {
  const newArticle = {
    title: title,
    topic: topic,
    author: username,
    body: body,
    created_at: new Date(Date.now()),
  };
  return connection("articles")
    .insert(newArticle)

    .returning("*")
    .then((article) => {
      return article[0];
    });
};

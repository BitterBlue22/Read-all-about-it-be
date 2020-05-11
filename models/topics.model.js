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

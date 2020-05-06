const connection = require("../db/connection");

exports.fetchTopics = () => {
  // console.log("inside topics controller");
  return connection
    .select("*")
    .from("topics")
    .then((topics) => {
      return topics;
    });
};

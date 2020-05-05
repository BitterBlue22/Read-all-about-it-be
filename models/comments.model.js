const connection = require("../db/connection");

exports.updateCommentById = (id, updatedInfo) => {
  console.log("inside comments model");
  return connection("comments")
    .returning("*")
    .where("comment_id", id)
    .update(updatedInfo)
    .then((updated) => {
      return updated[0];
    });
};

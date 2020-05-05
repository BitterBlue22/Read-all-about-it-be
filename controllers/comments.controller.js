const { updateCommentById } = require("../models/comments.model.js");

exports.patchCommentById = (req, res, next) => {
  console.log("inside comments controller");

  const { body } = req;
  const { comment_id } = req.params;

  updateCommentById(comment_id, body).then((comment) => {
    res.status(201).send(comment);
  });
};

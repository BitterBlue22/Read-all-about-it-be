const {
  updateCommentById,
  removeCommentById,
} = require("../models/comments.model.js");

exports.patchCommentById = (req, res, next) => {
  // console.log("inside comments controller");

  const { body } = req;
  const { comment_id } = req.params;

  updateCommentById(comment_id, body)
    .then((comment) => {
      res.status(201).send({ "updated comment": comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  // console.log("inside comments controller");
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

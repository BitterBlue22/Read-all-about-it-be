const {
  updateCommentById,
  removeCommentById,
  updateCommentVotesById,
} = require("../models/comments.model.js");

exports.patchCommentById = (req, res, next) => {
  const { body } = req;
  const { comment_id } = req.params;

  updateCommentById(comment_id, body) // ! not currently in use
    .then((comment) => {
      res.status(201).send({ comment: comment[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchCommentVotesById = (req, res, next) => {
  const { body } = req;
  const { comment_id } = req.params;

  updateCommentVotesById(comment_id, body)
    .then((comment) => {
      res.status(201).send({ comment: comment[0] });
    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

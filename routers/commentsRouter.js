const commentsRouter = require("express").Router();
const {
  patchCommentById,
  deleteCommentById,
  patchCommentVotesById,
} = require("../controllers/comments.controller");
const { handle405s } = require("../controllers/errorHandler");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVotesById)
  .delete(deleteCommentById)
  .all(handle405s);

module.exports = commentsRouter;

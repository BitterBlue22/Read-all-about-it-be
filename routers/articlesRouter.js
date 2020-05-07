const articlesRouter = require("express").Router();
const {
  getArticlesById,
  patchArticlesById,
  getCommentsByArticle,
  postCommentsByArticle,
  getAllArticles,
} = require("../controllers/articles.controller");
const { handle405s } = require("../controllers/errorHandler");

articlesRouter.route("/").get(getAllArticles).all(handle405s);
articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticlesById)
  .all(handle405s);
articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticle)
  .post(postCommentsByArticle)
  .all(handle405s);

module.exports = articlesRouter;

const articlesRouter = require("express").Router();
const {
  getArticlesById,
  patchArticlesById,
} = require("../controllers/articles.controller");

articlesRouter.route("/");
articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticlesById);

module.exports = articlesRouter;

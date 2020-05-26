const topicsRouter = require("express").Router();
const {
  getTopics,
  postNewArticle,
} = require("../controllers/topics.controller.js");
const { handle405s } = require("../controllers/errorHandler");

topicsRouter.route("/").get(getTopics).all(handle405s);
topicsRouter.route("/articles").post(postNewArticle).all(handle405s);
module.exports = topicsRouter;

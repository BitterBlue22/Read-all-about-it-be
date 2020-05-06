const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics.controller.js");
const { handle405s } = require("../controllers/errorHandler");

topicsRouter.route("/").get(getTopics).all(handle405s);
module.exports = topicsRouter;

const apiRouter = require("express").Router();
const articlesRouter = require("./articlesRouter.js");
const topicsRouter = require("./topicsRouter");

apiRouter.use("./articlesRouter.js", articlesRouter);
apiRouter.use("./topicsRouter", topicsRouter);

module.exports = apiRouter;

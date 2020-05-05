const apiRouter = require("express").Router();
const articlesRouter = require("./articlesRouter");
const topicsRouter = require("./topicsRouter");

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/topics", topicsRouter);

apiRouter.get("/", (req, res, next) => {
  res.status(200).send({ msg: "responding" });
});

module.exports = apiRouter;

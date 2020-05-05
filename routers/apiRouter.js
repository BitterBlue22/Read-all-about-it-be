const apiRouter = require("express").Router();
const articlesRouter = require("./articlesRouter");
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./usersRouter");
const commentsRouter = require("./commentsRouter");

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter.get("/", (req, res, next) => {
  res.status(200).send({ msg: "responding" });
});

module.exports = apiRouter;

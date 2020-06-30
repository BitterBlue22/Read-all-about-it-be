const apiRouter = require("express").Router();
const articlesRouter = require("./articlesRouter");
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./usersRouter");
const commentsRouter = require("./commentsRouter");
const endpoints = require("../endpoints.json");
const { handle405s } = require("../controllers/errorHandler");

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter.get("/", (req, res, next) => {
  res.status(200).send({ endpoints }).all(handle405s);
});

module.exports = apiRouter;

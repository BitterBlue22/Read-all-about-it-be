const express = require("express");
const app = express();
const apiRouter = require("./routers/apiRouter");
const {
  handleInternalErrors,
  send404,
  handlePSQLErrors,
  handleCustomErrors,
} = require("./controllers/errorHandler");

app.use(express.json());
app.use("/api", apiRouter);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(send404);
app.use(handleInternalErrors);

module.exports = app;

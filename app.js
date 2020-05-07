const express = require("express");
const app = express();
const apiRouter = require("./routers/apiRouter");
const {
  handleInternalErrors,
  send404,
  handle405s,
  handlePSQLErrors,
  handleCustomErrors,
} = require("./controllers/errorHandler");

app.use(express.json());
app.use("/api", apiRouter);
app.use(send404);
app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle405s);
app.use(handleInternalErrors);

module.exports = app;

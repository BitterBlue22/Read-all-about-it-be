const express = require("express");
const app = express();
const { handleInternalErrors } = require("./controllers/errorHandler");

app.use(express.json());
app.use("/api", apiRouter);

app.use(handleInternalErrors);

module.exports = app;

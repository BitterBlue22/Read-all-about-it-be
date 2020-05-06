const usersRouter = require("express").Router();
const { getUsersById } = require("../controllers/users.controller");
const { handle405s } = require("../controllers/errorHandler");
usersRouter.route("/").all(handle405s);
usersRouter.route("/:username").get(getUsersById).all(handle405s);

module.exports = usersRouter;

const usersRouter = require("express").Router();
const { getUsersById } = require("../controllers/users.controller");

usersRouter.route("/");
usersRouter.route("/:username").get(getUsersById);

module.exports = usersRouter;

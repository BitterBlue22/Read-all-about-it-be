const usersRouter = require("express").Router();
const {
  getUsersById,
  getAllUsers,
} = require("../controllers/users.controller");
const { handle405s } = require("../controllers/errorHandler");
usersRouter.route("/").get(getAllUsers).all(handle405s);
usersRouter.route("/:username").get(getUsersById).all(handle405s);

module.exports = usersRouter;

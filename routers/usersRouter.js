const usersRouter = require("express").Router();
const {
  getUsersById,
  getAllUsers,
  postNewUser,
} = require("../controllers/users.controller");
const { handle405s } = require("../controllers/errorHandler");
usersRouter.route("/").get(getAllUsers).post(postNewUser).all(handle405s);
usersRouter.route("/:username").get(getUsersById).all(handle405s);

module.exports = usersRouter;

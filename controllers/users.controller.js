const { fetchUsersById, fetchAllUsers } = require("../models/users.model.js");

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsersById = (req, res, next) => {
  const { username } = req.params;

  fetchUsersById(username)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch((err) => {
      next(err);
    });
};

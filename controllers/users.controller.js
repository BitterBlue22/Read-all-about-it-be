const {
  fetchUsersById,
  fetchAllUsers,
  addNewUser,
} = require("../models/users.model.js");

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

exports.postNewUser = (req, res, next) => {
  addNewUser(req.body)
    .then((newUser) => {
      res.status(201).send({ user: newUser });
    })
    .catch((err) => {
      next(err);
    });
};

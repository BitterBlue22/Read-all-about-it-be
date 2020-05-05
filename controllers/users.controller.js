const { fetchUsersById } = require("../models/users.model.js");

exports.getUsersById = (req, res, next) => {
  const { username } = req.params;
  console.log("inside users controller");
  fetchUsersById(username).then((user) => {
    res.status(200).send({ user: user });
  });
};

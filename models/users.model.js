const connection = require("../db/connection");

exports.fetchAllUsers = () => {
  return connection
    .select("*")
    .from("users")
    .then((users) => {
      return users;
    });
};

exports.fetchUsersById = (id) => {
  return connection
    .select("*")
    .from("users")
    .where("username", id)
    .then((user) => {
      if (user[0] === undefined)
        return Promise.reject({ status: 404, msg: "user not found" });
      return user[0];
    });
};

exports.addNewUser = (input) => {
  const { username, avatar_url, name } = input;
  const newUser = {
    username: username,
    avatar_url: avatar_url,
    name: name,
  };
  return connection
    .insert(newUser)
    .into("users")
    .returning("*")
    .then((user) => {
      return user[0];
    });
};

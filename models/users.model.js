const connection = require("../db/connection");

exports.fetchUsersById = (id) => {
  // console.log("inside users model");
  return connection
    .select("*")
    .from("users")
    .where("username", id)
    .then((user) => {
      return user;
    });
};

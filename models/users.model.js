const connection = require("../db/connection");

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

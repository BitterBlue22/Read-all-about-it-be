exports.up = function (knex) {
  return knex.schema.createTable("users", (user) => {
    user.string("username").primary().notNullable();
    user.text("avatar_url");
    user.text("name");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

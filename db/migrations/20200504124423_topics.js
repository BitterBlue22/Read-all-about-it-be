exports.up = function (knex) {
  return knex.schema.createTable("topics", (topic) => {
    topic.string("slug").primary();
    topic.text("description");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("topics");
};

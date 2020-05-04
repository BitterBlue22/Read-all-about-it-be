exports.up = function (knex) {
  return knex.schema.createTable("comments", (comment) => {
    comment.increments("comment_id").primary();
    comment.integer("author");
    comment.foreign("author").references("username").inTable("users");
    comment.integer("article_id");
    comment.foreign("article_id").references("article_id").inTable("articles");
    comment.integer("votes").defaultTo(0);
    comment.timestamp("created_at");
    comment.text("comments");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};

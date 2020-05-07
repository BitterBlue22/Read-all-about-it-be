exports.up = function (knex) {
  return knex.schema.createTable("articles", (article) => {
    article.increments("article_id").primary();
    article.text("title");
    article.text("body");
    article.integer("votes").defaultTo(0);
    article.string("topic");
    article.foreign("topic").references("slug").inTable("topics");
    article.string("author");
    article
      .foreign("author")
      .references("username")
      .inTable("users")
      .onDelete("CASCADE");
    article.timestamp("created_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};

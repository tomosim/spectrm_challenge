exports.up = function (knex) {
  return knex.schema.createTable("messages", (table) => {
    table.uuid("ID");
    table.string("content", 255);
    table.int("retrieval_count").defaultTo(0);
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("messages");
};

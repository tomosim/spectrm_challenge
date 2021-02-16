exports.up = function (knex) {
  return knex.raw('create extension if not exists "uuid-ossp"').then(() => {
    return knex.schema.createTable("messages", (table) => {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("content", 255);
      table.integer("retrieval_count").defaultTo(0);
    });
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("messages").then(() => {
    return knex.raw('drop extension if exists "uuid-ossp"');
  });
};

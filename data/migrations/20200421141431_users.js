
exports.up = function(knex) {
  return knex.schema.createTable('users', t=> {
      t.increments('id').unsigned().primary();
      t.string('username').notNullable().unique();
      t.string('password').notNullable();
      t.string('department').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};

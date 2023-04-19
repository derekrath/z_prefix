
exports.up = function(knex) {
    return knex.schema.createTable('users_table', table => {
        table.increments('id');
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.string('passwordHash').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users_table')
};

// run to initiate table:
//  npx knex migrate:latest
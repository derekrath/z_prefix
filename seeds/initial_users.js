
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_table').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_table').insert([
        {id: 1, username: 'John', password: 'Doe', passwordHash: '0'}
      ]);
    });
};

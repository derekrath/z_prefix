
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_table').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_table').insert([
        {username: 'John', passwordHash: '$2a$12$h.RYShF4Vd16s3nu84xG4OeYwkd8Vjk5/RCRau6f8KlzmAzpWK1FG'}
      ]);
    });
};

require("dotenv").config();

// Update with your config settings.
// const connection = process.env.DB_CONNECTION_STRING;
// <<use this for dev without ssl
const connection = {
  connectionString: process.env.DB_CONNECTION_STRING, // IMPORTANT - HEROKU SETS THIS AND CHANGES IT PERIODICALLY
  ssl: {
    rejectUnauthorized: false,
  },
};
// <<use this for production

module.exports = {

  development: {
    client: 'pg',
    connection: connection
    // connection: process.env.DB_CONNECTION_STRING,
    // connection: 'postgres://postgres:docker@localhost/postgres'
  },

  staging: {
    client: 'postgresql',
    connection: {
      // database: 'my_db',
      database: 'db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    // client: 'postgresql',
    connection,
    // connection: {
    //   // database: 'my_db',
    //   database: 'db',
    //   user:     'username',
    //   password: 'password'
    // },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  },
};

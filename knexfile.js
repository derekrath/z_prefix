//to set up a container in docker for development: docker run --name container -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:14.1
//postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}

// const connect = {
//   client: "pg",
//   connection: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };

// module.exports = {
//   development: connect,
//   staging: connect,
//   production: connect,
// };

// connection: 'postgres://postgres:docker@localhost/postgres'
// const connectionString = process.env.DB_CONNECTION_STRING; 
// const connection = {
//   client: "pg",
//   connection: process.env.DB_CONNECTION_STRING,
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   }
// };
// console.log(process.env.DB_CONNECTION_STRING)
// >>>>>>  postgres://postgres:docker@db:5432/postgres
// Update with your config settings.
// const connection = process.env.DB_CONNECTION_STRING;
// <<use this for dev without ssl
// const connection = {
  // connectionString: process.env.DB_CONNECTION_STRING, // IMPORTANT - HEROKU SETS THIS AND CHANGES IT PERIODICALLY
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };
// THIS IS YOUR PRODUCTION CONNECTION - NOTE THE SSL SETTING
// const connection = {
//   connectionString: process.env.DATABASE_URL, // IMPORTANT - HEROKU SETS THIS AND CHANGES IT PERIODICALLY
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };
// <<use this for production




// working for dev:
require('dotenv').config();
const connectionString = process.env.DATABASE_URL;

// const connectionString = `postgresql://db:AVNS_tVS3yr8u8LVISeHtwXy@app-daf4bdfe-f252-4617-afc9-b7a5998f199a-do-user-14384336-0.b.db.ondigitalocean.com:25060/db?sslmode=require`;
// const connectionString = `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?sslmode=require`;

// const { parse } = require('pg-connection-string');
// const connectionString = process.env.DATABASE_URL;
// const dbConfig = parse(connectionString);

module.exports = {
  development: {
    client: "pg",
    connection: connectionString,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
    },
    // migrations: {
    //   tableName: ["users_table", "blogs_table"],
    // },
  },
  staging: {
    client: "pg",
    connection: connectionString,
    pool: {
      min: 2,
      max: 10,
    },
    // migrations: {
    //   tableName: ["users_table", "blogs_table"],
    // },
    migrations: {
      directory: './migrations',
    },
  },
  production: {
    client: "pg",
    connection: { connectionString, ssl: { rejectUnauthorized: false } },
    // connection: {
    //   host: dbConfig.host,
    //   port: dbConfig.port,
    //   user: dbConfig.user,
    //   password: dbConfig.password,
    //   database: dbConfig.database,
    //   ssl: { rejectUnauthorized: false },
    // },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
    },
    // migrations: {
    //   tableName: ["users_table", "blogs_table"],
    // },
  },
};


// using for prod:
// module.exports = {
//   development: {
//     client: "pg",
//     connection: "postgres://postgres:docker@db:5432/postgres",
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: ["users_table", "blogs_table"],
//     },
//   },

//   staging: {
//     client: "pg",
//     connection: `postgres://${db.USERNAME}:${db.PASSWORD}@${db.HOSTNAME}:${db.PORT}/${db.DATABASE}`,
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: ["users_table", "blogs_table"],
//     },
//   },

//   production: {
//     client: "pg",
//     connection: `postgres://${db.USERNAME}:${db.PASSWORD}@${db.HOSTNAME}:${db.PORT}/${db.DATABASE}`,
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: ["users_table", "blogs_table"],
//     },
//   },
// };

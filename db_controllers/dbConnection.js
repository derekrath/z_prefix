// const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
// alternative format:
// const knex = require('knex');
// const config = require('../knexfile');
// const environment = process.env.NODE_ENV;
// module.exports = knex(configs[environment]);

// console.log('dbconnection NODE_ENV: ', NODE_ENV);
// NODE_ENV specifically is used (by convention) to state whether a particular environment is a production or a development environment.
// const environment = process.env.ENVIRONMENT || 'development'

// working on dev:
// const environment = process.env.NODE_ENV || 'development'
// const config = require('../knexfile.js')[environment];
// module.exports = require('knex')(config);


// alternatives:
// const environment = process.env.NODE_ENV || 'development'
// const environment = 'production';
// const config = require('../knexfile.js')[environment];
// const knex = require('knex')(config);
// module.exports = knex;
// 
// const environment = process.env.NODE_ENV || 'development';
// const config = environment === 'production'
// ? { client: 'postgresql', connection: process.env.DATABASE_URL }
// : require('../knexfile.js')[environment];
// module.exports = require('knex')(config);


// for prod:
// const knex = require('knex');
// const config = require('../knexfile');
// const environment = process.env.NODE_ENV;
// const output = knex(config[environment]);
// console.log('output;', output)
// module.exports = output;


require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';  //don't use this in production, testing DigitalOCean db connectio only
// const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
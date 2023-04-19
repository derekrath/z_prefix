// const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
// alternative format:
// const knex = require('knex');
// const config = require('../knexfile');
// const environment = process.env.NODE_ENV;
// module.exports = knex(configs[environment]);

const environment = process.env.NODE_ENV || 'development'
// NODE_ENV specifically is used (by convention) to state whether a particular environment is a production or a development environment.
// const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);

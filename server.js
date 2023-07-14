// const { app } = require('../ui/src/index.js');
const app = require('./app');

require("dotenv").config();
const PORT = (process.env.PORT) || 8080// THIS IS IMPORTANT - HEROKU DECIDES WHICH PORT


app.listen(PORT, () => {
    console.log(`.env: Server is listening on http://localhost:${PORT}`);
    console.log(`.env: DATABASE_URL ${process.env.DATABASE_URL}`);
});

// in package.json:
    // "start:dev": "nodemon server.js",
    // "start:knex": "npx knex migrate:latest",
    // "start": "npm run start:knex && node server.js",
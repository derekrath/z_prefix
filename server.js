// const { app } = require('../ui/src/index.js');
const app = require('./app');

require("dotenv").config();
// const PORT = (process.env.PORT) // THIS IS IMPORTANT - HEROKU DECIDES WHICH PORT
// alternative:
const port = process.env.PGPORT || 8080; //gonna use this one in dev? changed 3001 to 8080
// const port = 8080;

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
    console.log(`PORT: ${process.env.PGPORT}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
});

// in package.json:
    // "start:dev": "nodemon server.js",
    // "start:knex": "npx knex migrate:latest",
    // "start": "npm run start:knex && node server.js",
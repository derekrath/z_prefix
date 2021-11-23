// const { app } = require('../ui/src/index.js');
const express = require('express');
const app = express();
const PORT = 3000;
// require("dotenv").config();
// const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cors = require('cors');
const morgan = require('morgan');

app.use(morgan());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req,res) => {
    console.log('Getting from /');
    const result = await knex('users')
        .select('*');
    res.status(200).json(result);
});

// app.post('/', async (req,res) => {
//     console.log('Posting from /');
// let data = req.body;

//     const result = await knex('users')
//         .returning('*')
//         .insert(data)
//         .then(data => data)
//     res.status(200).json(result);
// });

app.listen(PORT
, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})
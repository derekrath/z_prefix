// const { app } = require('../ui/src/index.js');
const express = require('express');
const app = express();
const PORT = 3000;
// require("dotenv").config();
// const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');

// salty server stuff
const saltRounds = 12;
const { hash, compare } = bcrypt; 

function createNewUser(username, passwordHash){
    return knex('users')
        .insert({ username, passwordHash })
        .then(data=>data);
}

function getPasswordHashByUser(username){
    return knex('users')
        .where({username})
        .select('passwordHash')
        .then((data) => data[0].passwordHash)
}

app.use(morgan());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login/createUser', (req, res) => {
    let { body } = req;
    let { username, passwordRaw } = body;

    hash(passwordRaw, saltRounds)
        .then((passwordHash) => {
            console.log('Raw password:', passwordRaw)
            console.log('Hashed Password', passwordHash)
            createNewUser(username, passwordHash)
                .then((data) = res.status(201).json('NEW USER CREATED'))
                .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
});

app.post('/login/getUser', (req, res) => {
    let { body } = req;
    let { username, passwordRaw } = body;

    getPasswordHashByUser(username)
        .then((passwordHash) => {
            console.log('Raw password supplied:', passwordRaw)
            console.log('Hashed Password form db', passwordHash)
            compare( passwordRaw, passwordHash)
                .then((isMatch) => {
                    if (isMatch) res.status(202).json('PASSWORDS MATCH');
                    else res.status(401).json('NO PASSWORD MATCH');
                })
                .catch((err) => res.status(500).json(err))
        })
});

//data demo:

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
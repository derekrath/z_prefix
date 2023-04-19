const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');

// Import User Functions from controllers
const {createNewUser, getPasswordHashByUser} = require("./db_controllers/controllers");

// salty server stuff
const saltRounds = 12;
const { hash, compare } = bcrypt; 

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const knex = require("./db_controllers/dbConnection");

console.log(`NODE ENVIRONMENT IN HEROKU: `, process.env.NODE_ENV);

// Update Database
//create user
app.post('/users', (req, res) => {
    let { body } = req;
    let { username, passwordRaw } = body;
    console.log('user received:', username)

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

// app.post('/login', (req, res) => {
//     let username = req.body.username
//     let password = req.body.password
  
//     knex.select('id', 'username')
//       .from('users_table')
//       .where({ username })
//       .andWhere({ password })
//       .then((result) => {
//         if (result.length < 1) {
//           res.status(401).send("Invalid login")
//         } else {
//           res.json(result[0])
//         }
//       })
//   })

//login user
app.post('/login', (req, res) => {
    let { body } = req;
    let { username, passwordRaw } = body;
    // let user = req.params.username

    getPasswordHashByUser(username)
        .then((passwordHash) => {
            console.log('Raw password supplied:', passwordRaw)
            console.log('Hashed Password form db', passwordHash)
            compare( passwordRaw, passwordHash )
                .then((isMatch) => {
                    // if (isMatch) res.status(202).json('PASSWORDS MATCH');
                    if (isMatch) res.status(202).json(result[0]);
                    else res.status(401).json('NO PASSWORD MATCH');
                })
                .catch((err) => res.status(500).json(err))
        })
        .then(res.send())
});

//data demo:

app.get('/', async (req,res) => {
    console.log('Getting from /');
    const result = await knex('users_table')
        .select('*');
    res.status(200).json(result);
});

// app.post('/', async (req,res) => {
//     console.log('Posting from /');
//     let data = req.body;
//     const result = await knex('users_table')
//         .returning('*')
//         .insert(data)
//         .then(data => data)
//     res.status(200).json(result);
// });

module.exports = app;
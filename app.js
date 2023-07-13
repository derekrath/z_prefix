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

const knex = require('./db_controllers/dbConnection');
const { check } = require('yargs');

console.log(`NODE ENVIRONMENT IN HEROKU: `, process.env.NODE_ENV);

// Get data from ui and update Database
//create user
app.post('/users', (req, res) => {
    let { body } = req;
    let { user_username, passwordRaw } = body;
    hash(passwordRaw, saltRounds)
        .then((passwordHash) => {
            createNewUser(user_username, passwordHash)
                // .then((data) = res.status(201).send({message:'NEW USER CREATED'}))
                // .then(data => {console.log('app data: ', data)})
                .then(data => {
                    if(data.length > 0){
                        console.log('User was created. Result from controller is > 0? = ', data.length)
                //         // res.status(201).send('This username does not exist.')
                        res.status(201).send({message:'NEW USER CREATED'})
                    }
                    else{
                        console.log('result from controller is 0? = ', data.length)
                        // return data.message = 'hey'
                        res.status(401).send({message: 'USERNAME IS ALREADY IN USE'})
                    }
                })
                .catch((err) => res.status(500).json(err));
                // .catch((err) => res.status(500).json(err));
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

//login user with username and raw password
app.post('/login', (req, res) => {
    // let { body } = req;
    // let { username, password } = body;
    // let passwordRaw = password;
    let username = req.body.username
    // could be raw or hash!!!!
    let password = req.body.password
    // let user = req.params.username
    getPasswordHashByUser(username)
    .then((passwordHash) => {
        if(passwordHash){
            if(password == passwordHash) {res.status(202).json(passwordHash)}
            else{
                let passwordRaw = password;
                compare( passwordRaw, passwordHash )
                .then((isMatch) => {
                    // if (isMatch) res.status(202).json('PASSWORDS MATCH');
                    // if (isMatch) res.status(202).json('LOGIN SUCCESSFUL');
                    // if (isMatch) res.status(202).send({message: 'yes'});
                    // if (isMatch) {console.log(); res.status(202).send(passwordHash)}
                if (isMatch) res.status(202).json(passwordHash);
                    // if (isMatch) res.status(202).send(result[0]);
                    // else res.status(401).json('NO PASSWORD MATCH');
                    // else res.status(401).json('INVALID PASSWORD');
                    else {res.status(401).send({message:'INVALID PASSWORD'})}
                })
            }
        }
        // else res.status(401).send({message:'INVALID USERNAME'})
        else res.status(401).json('INVALID USERNAME')
    })
    // .catch((err) => res.status(500).json(err));
    .catch((err) => res.status(500).send(err));
    // .then( response => {
    //     console.log('result of user check:', response) 
    //     setUserData(response)
    //     setCookie('logged-in-username', username)
    //     setCookie('logged-in-password-hash', password_hash)
    //     return true
    //   })
    //   .catch(err => {
    //     return false
    //   })
    // })
    // .then((passwordHash) => {
    //         console.log('Raw password supplied:', passwordRaw)
    //         console.log('Hashed Password form db', passwordHash)
    //         compare( passwordRaw, passwordHash )
    //             .then((isMatch) => {
    //                 // if (isMatch) res.status(202).json('PASSWORDS MATCH');
    //                 if (isMatch) res.status(202).json(result[0]);
    //                 else res.status(401).json('NO PASSWORD MATCH');
    //             })
    //             .catch((err) => res.status(500).json(err))
    // })
    // .then(res.send())
});

//data demo:

app.get('/users', async (req,res) => {
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

//get all blogs
app.get('/blogs', async (req,res) => {
    const result = await knex('blogs_table')
        .select('*');
    res.status(200).json(result);
});

//get blogs for user
app.get('/blogs/:username', (req, res) => {
    // let username = req.body.username;
    let username = req.params.username;
    knex.from('blogs_table').innerJoin('users_table', 'blogs_table.blog_username', 'users_table.user_username')
        .select('blogs_table.blog_username', 'blogs_table.title', 'blogs_table.content', 'blogs_table.updated_at')
        .where({blog_username: username})
        .then(data => {
            res.status(201).json(data)})
        .catch(err =>
            res.status(404).json('No blogs posted')
        )
});

async function createNewBlog(username, title, content){
    await knex('users_table')
        .where({user_username: username})
        .then(data => {
            if (data.length > 0 && content.length < 100 ) {
                //if user exists, post blog for user
                knex('blogs_table')
                    .insert({ blog_username: username, title: title, content: content })
                    .returning('title')
                    // .then(console.log('returning title: ', title))
                    .then((data) = res.status(201).json(`BLOG CREATED ${title}`))
                    // .catch((err) => res.status(500).json(err))
            } else {
                res.status(401).send('Please Login.')
                //dont post blog for user
            }
        })
        .catch((err) => res.status(500).json(err))
}

//create blog
app.post('/blogs/:username', (req, res) => {
    let username = req.body.blog_username;
    let title = req.body.title;
    let content = req.body.content;
    //check if user exists
    knex('users_table')
        .where({user_username: username})
        .then(data => {
            if (data.length > 0 && content.length < 100 ) {
                //if user exists, post blog for user
                knex('blogs_table')
                    .insert({ blog_username: username, title: title, content: content })
                    .returning('title')
                    .then(console.log('returning title: ', title))
                    .then((data) = res.status(201).json(`BLOG CREATED ${title}`))
                    // .catch((err) => res.status(500).json(err))
            } else {
                res.status(401).send('Please Login.')
                //dont post blog for user
            }
        })
        // .then((data) => {console.log('blog data created: ', data)})
        // .then((data) = res.status(201).send({message:`NEW BLOG ${title} CREATED`}))
        .catch((err) => res.status(500).json(err));
});

// //edit blog
app.put('/blogs/:username', (req, res) => {
    let username = req.body.blog_username;
    let title = req.body.title;
    let content = req.body.content;
    //check if user exists
    // knex('users_table')
        // .where({user_username: blog_username})
        // .then(data => {
            // if (data.length > 0 && content.length < 100 ) {
                //if user exists, post blog for user
                // console.log('data.length: ', data.length)
                knex('blogs_table')
                .where({blog_username: username, title: title})
                .update({
                    content: content})
                .returning('title')
                .then((data) = res.status(201).json(`BLOG UPDATED ${title}`))
            // } else {
                // console.log('401 Please Login')
                // res.status(401).send('Please Login.')
                //dont post blog for user
            // }
        // })
        .catch((err) => res.status(500).json(err))
});

//delete blog
app.delete('/blogs/:username', (req, res) => {
    const username = req.body.blog_username;
    const title = req.body.title;
    knex('blogs_table')
        .where({blog_username: username, title: title})
        .del()
        .catch((err) => res.status(500).json(err))
});


// const port = process.env.PORT || 8080;

module.exports = app;
// const config = require("postgres/lib/types");
const knex = require("./dbConnection");

// User Functions:
// create user
// hashed password
// create blog
// get all blogs
// delete blogs
// update blogs

function getPasswordHashByUser(username){
    knex.select('id', 'username', 'passwordHash')
    .from('users_table')
    .where({username})
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data[0].passwordHash)
      }
      else {
        res.status(404).json('No username found')
      }
    })
    .catch(err =>
      res.status(404).json('The data you are looking for could not be found. Please try again')
    );
    // return knex('users_table')
    //     .where({username})
    //     .select('passwordHash')
    //     .then((data) => data[0].passwordHash)
}

async function createNewUser(username, passwordHash){
    await knex('users_table')
        .where({ username })
        .then(result => {
            if (result.length > 0) {
                res.status(409).send('This username is already in use.')
            } else {
            knex('users_table')
                .insert({ username, passwordHash })
                .returning(['id', 'username'])
                .then(newUser => res.status(201).json(newUser[0]))
                // .then(data=>data);
            }
      })
}

module.exports = {createNewUser, getPasswordHashByUser}
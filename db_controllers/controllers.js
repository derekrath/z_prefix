// controls communication with database

// const config = require("postgres/lib/types");
// *******************************************
// *******************************************
// user this after successfully deploying:
// const knex = require("./dbConnection");
// *******************************************
// *******************************************
const knex = require('knex')({client: 'pg'});

function getPasswordHashByUser(username){
    // return knex.select('id', 'username', 'passwordHash')
    return knex.select('passwordHash')
      .from('users_table')
      // .where({username})
      .where({ user_username: username })
      // .then(data => data[0].passwordHash)
      .then((result) => {
        if (result.length < 1) {
          return undefined
      //     // console.log('result', res)
          // res.status(401).send("Invalid login")
        } else {
          // res.json(result[0].passwordHash)
          return result[0].passwordHash
        }
      })
    // .then(data => {
    //   if (data.length > 0) {
    //     res.status(200).json(data[0].passwordHash)
      // }
    //   else {
    //     console.log('no user found')
    //     res.status(404).json('No username found')
    //   }
    // })
    // .catch(err =>
    //   res.status(404).json('The data you are looking for could not be found. Please try again')
    // );
}
function createNewUser(username, passwordHash){
  return knex('users_table')
      // .where({ username })
      .where({ user_username: username })
      .then(result => {
          if (result.length > 0) {
            return []
            // return result;
            // res.status(409).send('This username is already in use.')
          } else {
            return knex('users_table')
              .insert({ user_username: username, passwordHash })
              .returning(['id', 'user_username'])
              // .then((data) => 
              //   console.log('new insert data:', data)
              // )
              // .then(newUser => res.status(201).json(newUser[0]))
              // .then(data=>data)
              .catch((err) => res.status(500).json(err));
          }
      })
      .catch((err) => res.status(500).json(err));
}

module.exports = {createNewUser, getPasswordHashByUser}
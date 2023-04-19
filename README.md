# z_prefix

If you are using Docker to store your data, prior to running backend, open Docker app and run the container in which you will be storing your data. Will be utilizing the Postgres image in this app. Steps to set up and run a postgres container:

docker pull postgres

docker run --name (name of container) -e POSTGRES_PASSWORD=(password) -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

docker run --name postgres -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

if docker container is already created: docker run (container name)

docker exec -it (container name) /bin/bash, you are now in the shell of your container
<!-- docker exec -it db /bin/bash -->

psql -U postgres, running your image in your container

Now in your container you can CREATE DATABASE (database name) or \c into an already created database. To view tables when in a database: \d or to look at a specific table \dt (table name)

When done, ^C to escape out

Make sure to configure knexfile.js with appropriate connection string with the following template: 
connection: '(image)://(image):(password)@localhost/(database name)'
postgres://postgres:docker@db:5432/postgres

Once knex is configured and container has been started:

npx knex migrate:latest and npx knex seed:run 

to populate database with character information

npm start 

to bring your backend up so frontend can connect and retrieve data from it.
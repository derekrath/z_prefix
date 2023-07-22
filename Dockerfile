# This file containerizes the application

# update alpine from 16 to latest
# FROM node:16-alpine
FROM node:latest

# RUN mkdir -p /server

WORKDIR /server

# COPY . /server

COPY . .

RUN rm -f node_modules

RUN npm install

# delete on production
# RUN npm install -g nodemon

EXPOSE 8080

CMD ["npm", "run", "start"]
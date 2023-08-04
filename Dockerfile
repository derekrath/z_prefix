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

ENV PORT=8080
# EXPOSE 8080
EXPOSE $PORT

CMD ["npm", "run", "start"]
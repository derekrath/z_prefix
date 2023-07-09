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
RUN npm install -g nodemon

# RUN apk add --no-cache make gcc g++ python && \
#   npm install && \
#   npm rebuild bcrypt --build-from-source && \
#   apk del make gcc g++ python

# EXPOSE 3001
EXPOSE 8080

EXPOSE 3000
# Why am I exposing the ui port here if my backend and frontend are separate?

# remove for production (dont expose to public)
# EXPOSE 5432

# CMD npm start

CMD ["npm", "run", "start"] 
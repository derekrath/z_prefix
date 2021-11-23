FROM node:16-alpine

# RUN mkdir -p /src/app

WORKDIR /server

COPY . /server

EXPOSE 3001

EXPOSE 3000

# //remove for production (dont expose to public)
# EXPOSE 5432

RUN npm install

# delete on production
RUN npm install -g nodemon

CMD npm start
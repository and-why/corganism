require('dotenv').config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('../schema/types/index.js');
const resolvers = require('../schema/resolvers/index.js');

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  //wait for the server to start
  await apolloServer.start();

  //apply the middleware of express defined above
  apolloServer.applyMiddleware({ app: app, path: '/graphql' }); // the default path for the graphql server is '/graphql' so adding the path is not needed but I leave it there in case you want a differnet path for some reason.

  // send a response from the express server
  app.use((req, res) => {
    res.send('hello from express apollo server');
  });

  // connect to our MongoDB database. this is why we needed the .env file and needed to import that file at the very very top
  await mongoose.connect(process.env.MONGO_DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  // logs that we're connected to the console.
  console.log('mongoose connected');

  // set the port for the listening. Choose anything other than 3000, as that's the where the Next.js app will run from.
  app.listen(4000, () =>
    console.log(
      'Server is running on post 4000: http://localhost:4000 - go to graphql server here: http://localhost:4000/graphql ',
    ),
  );
}

startServer();

require('dotenv').config();
const express = require('express');
const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// GraphQL server setup
const server = new GraphQLServer({
  typeDefs: './schema/schema.graphql',
  resolvers: {
    Query,
    Mutation,
  },
});

// Start server
server.start(() => console.log('Server is running on http://localhost:4000'));

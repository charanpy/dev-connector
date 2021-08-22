const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const graphqlContext = require('./context');

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const user = await graphqlContext(req, res);
    return user;
  },
  playground: true,
  introspection: true,
  debug: true,
});

module.exports = apolloServer;

const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const graphqlContext = require('./context');

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const user = await graphqlContext(req);
    return user;
  },
  playground: true,
  introspection: true,
  debug: true,
});

module.exports = apolloServer;

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const permissions = require('./shield');
const user = require('./typedefs/user.type');
const UserResolver = require('./resolvers/user/user-resolver');

const schema = makeExecutableSchema({
  typeDefs: [user],
  resolvers: [UserResolver],
});

const schemaWithMiddleware = applyMiddleware(schema, permissions);

module.exports = schemaWithMiddleware;

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const permissions = require('./shield');
const user = require('./typedefs/user.type');
const UserResolver = require('./resolvers/user/user-resolver');
const profile = require('./typedefs/profile.type');
const profileResolver = require('./resolvers/profile/profile-resolver');

const schema = makeExecutableSchema({
  typeDefs: [user, profile],
  resolvers: [UserResolver, profileResolver],
});

const schemaWithMiddleware = applyMiddleware(schema, permissions);

module.exports = schemaWithMiddleware;

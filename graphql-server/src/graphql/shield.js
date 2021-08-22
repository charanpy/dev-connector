const { shield, rule, not } = require('graphql-shield');

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, { userId }, info) => {
    // console.log('sh', userId);
    return !!userId;
  }
);

const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
    },
    Mutation: {
      register: not(isAuthenticated),
      login: not(isAuthenticated),
      logout: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
  }
);

module.exports = permissions;

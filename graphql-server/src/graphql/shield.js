const { shield, rule, not } = require('graphql-shield');

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_, args, { userId }, info) => {
    return !!userId;
  }
);

const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
      profile: isAuthenticated,
    },
    Mutation: {
      register: not(isAuthenticated),
      login: not(isAuthenticated),
      logout: isAuthenticated,
      updateProfile: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
  }
);

module.exports = permissions;

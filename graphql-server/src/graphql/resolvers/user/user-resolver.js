const { register, login } = require('../../../controller/auth/auth.controller');

const UserResolver = {
  Query: {
    me: async (_, args, { userId, User }) => {
      const user = await User.findById(userId);
      return user;
    },
  },
  Mutation: {
    register: async (
      parent,
      { input: { email, password }, username },
      { validate }
    ) => {
      validate({ email, password, username });
      const user = await register({ email, username, password });
      return user;
    },

    // login
    login: async (parent, { input: { email, password } }, { validate }) => {
      validate({ email });
      const user = await login({ email, password });
      return user;
    },
  },
};

module.exports = UserResolver;

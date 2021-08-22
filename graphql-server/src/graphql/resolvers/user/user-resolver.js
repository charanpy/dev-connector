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
    login: async (
      parent,
      { input: { email, password } },
      { validate, res }
    ) => {
      validate({ email });
      const user = await login({ email, password });
      res.cookie('devConnectorSession', user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        maxAge: 1000 * 60 * 60 * 24,
      });
      return user;
    },
    logout: (_, args, { res }) => {
      res.cookie(process.env.COOKIE, '');
      return 'Logged out successfully';
    },
  },
};

module.exports = UserResolver;

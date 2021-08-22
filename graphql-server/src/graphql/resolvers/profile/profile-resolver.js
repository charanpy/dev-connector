const profileResolver = {
  Query: {
    profile: () => {
      return {
        user: '12',
      };
    },
  },
  profile: {
    async user(parent, args, { userId, User }) {
      return await User.findById(userId);
    },
  },
};

module.exports = profileResolver;

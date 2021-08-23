const {
  updateUserProfile,
} = require('../../../controller/user/user.controller');
const validateCredentials = require('../../../lib/validators/validator');

const profileResolver = {
  Query: {
    profile: async (_, args, { userId, models: { Profile } }) => {
      const profile = await Profile.findOne({ user: userId });
      return profile;
    },
  },
  Mutation: {
    async updateProfile(_, { profile }, { userId }) {
      validateCredentials(profile);
      const updatedProfile = await updateUserProfile({ profile, userId });
      return updatedProfile;
    },
  },
  profile: {
    async user({ user }, args, { models: { User } }) {
      console.log(user);
      return await User.findById(user);
    },
  },
};

module.exports = profileResolver;

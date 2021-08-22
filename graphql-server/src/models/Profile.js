const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    default: 'Anonymous',
    minlength: [2, 'Username should be minimum of 2 character long'],
  },
  jobTitle: {
    type: String,
    trim: true,
    minlength: [2, 'Jobtitle should be minimum of 2 character long'],
  },
  jobDescription: {
    type: String,
    trim: true,
    minlength: [2, 'Job description should be minimum of 2 character long'],
  },
  skills: {
    type: String,
  },
  socialLinks: {
    github: {
      type: String,
      validate: {
        validator: function (link) {
          return link && link.startsWith('https://github.com');
        },
      },
    },
    instagram: {
      type: String,
      validate: {
        validator: function (link) {
          return link && link.startsWith('https://instagram.com');
        },
      },
    },
  },
  website: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  projects: [
    {
      title: {
        type: String,
        required: true,
        minlength: [2, 'Project title should be minimum of 2 character long'],
      },
      description: {
        type: String,
      },
      projectLink: {
        type: String,
      },
      githubLink: {
        type: String,
      },
    },
  ],
  lovedTechnology: {
    type: String,
  },
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;

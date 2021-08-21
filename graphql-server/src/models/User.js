const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    trim: true,
    unique: true,
    validate: isEmail,
  },

  username: {
    type: String,
    trim: true,
    default: 'Anonymous',
    minlength: [2, 'Username should be minimum of 2 character long'],
  },

  google: {
    type: Boolean,
    default: false,
  },

  googleId: {
    type: String,
    default: null,
  },

  password: {
    type: String,
    required: function () {
      console.log(!this.google || !this.googleId);
      return !this.google || !this.googleId;
    },
    minlength: [8, 'Password should be minimum of 8 character long'],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  if (this?.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function (dbPassword, userPassword) {
  return await bcrypt.compare(dbPassword, userPassword);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

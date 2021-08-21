const { UserInputError } = require('apollo-server-errors');
const User = require('../../models/User');
const catchAsync = require('../../lib/promise');
const { generateToken } = require('../../lib/jwt');
const fields = 'username _id password google';

exports.register = catchAsync(async (req) => {
  const user = await User.create(req);
  return user;
});

exports.login = catchAsync(async (req) => {
  const { email, password } = req;
  console.log(req);
  const user = await User.findOne({ email }).select(fields);
  if (!user || !(await user.comparePassword(password, user.password))) {
    console.log('err');

    throw new UserInputError('Invalid credentials');
  }
  console.log('noerr');

  const token = generateToken({ id: user._id });
  return {
    token,
    user,
  };
});

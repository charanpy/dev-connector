const { verifyToken } = require('../lib/jwt');
const validate = require('../lib/validators/validator');
const User = require('../models/User');

const ctxData = {
  userId: null,
  validate,
  User,
};

const context = async (req) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return ctxData;
  }

  const user = await verifyToken(token);
  if (!user) {
    return null;
  }
  return {
    ...ctxData,
    userId: user._id,
  };
};

module.exports = context;

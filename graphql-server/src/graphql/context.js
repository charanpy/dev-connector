const { verifyToken } = require('../lib/jwt');
const validate = require('../lib/validators/validator');
const User = require('../models/User');

const constructContext = (res, userId = null) => ({
  userId,
  validate,
  User,
  res,
});

const context = async (req, res) => {
  const token = req?.cookies[process.env.COOKIE] || req.headers.authorization;
  if (!token) {
    return constructContext(res);
  }

  const user = await verifyToken(token);
  console.log(user, 223);
  if (!user) {
    return constructContext(res);
  }
  return constructContext(res, user._id);
};

module.exports = context;

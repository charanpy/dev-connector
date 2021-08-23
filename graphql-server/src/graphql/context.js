const { verifyToken } = require('../lib/jwt');
const validate = require('../lib/validators/validator');
const models = require('../models');

const constructContext = (res, userId = null) => ({
  userId,
  validate,
  models,
  res,
});

const context = async (req, res) => {
  const token = req?.cookies[process.env.COOKIE] || req.headers.authorization;
  if (!token) {
    return constructContext(res);
  }

  const user = await verifyToken(token);
  if (!user) {
    return constructContext(res);
  }
  return constructContext(res, user._id);
};

module.exports = context;

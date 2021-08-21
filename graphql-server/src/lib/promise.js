const { ApolloError } = require('apollo-server-errors');
const appError = require('./appError');

const handlePromise = (fn) => {
  return new Promise((resolve, reject) => {
    fn()
      .then((data) => resolve(data))
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const handlePromises = async (fn) => {
  try {
    const response = await fn();
    return response;
  } catch (e) {
    const [error] = appError(e);
    throw new ApolloError(error);
  }
};

const catchAsync = (fn) => {
  return (args) =>
    fn(args).catch((e) => {
      console.log(e, 22);
      throw new ApolloError(appError(e));
    });
};

module.exports = catchAsync;

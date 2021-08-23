const { UserInputError } = require('apollo-server-errors');
const {
  isObject,
  constructErrorMessages,
  validateInput,
} = require('./helpers');
const { validators } = require('./input-validators');

const loopObject = (obj, cb) => {
  for (let index in obj) {
    cb(index, obj);
  }
};

const validate = (index, data) => {
  const [, value] = [index, data[index]];
  if (!isObject(value)) {
    const [isValid, message, key = null] = validateInput(
      index,
      value,
      validators
    );
    if (!isValid) {
      throw new UserInputError(constructErrorMessages(message, key), '400');
    }
    return true;
  }
  // validating nest object fields
  return loopObject(value, validate);
};

// validating each field in object by iterating through object
const validateCredentials = (credentials) => {
  if (!isObject(credentials)) {
    throw new UserInputError(constructErrorMessages('emptyObject'));
  }
  return loopObject(credentials, validate);
};

module.exports = validateCredentials;

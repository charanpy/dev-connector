const { UserInputError } = require('apollo-server-errors');
const {
  isObject,
  constructErrorMessages,
  validateInput,
} = require('./helpers');
const { validators } = require('./input-validators');

const validateCredentials = (credentials) => {
  if (!isObject(credentials)) {
    throw new UserInputError(constructErrorMessages('emptyObject'));
  }

  for (let index in credentials) {
    const [isValid, message, key = null] = validateInput(
      index,
      credentials[index],
      validators
    );
    if (!isValid) {
      throw new UserInputError(constructErrorMessages(message, key), '400');
    }
  }

  return true;
};

module.exports = validateCredentials;

const errorMessages = {
  email: 'Enter valid email',
  password:
    'Password must contain one lowercase,one special character and minimum length of 6',
  len: 'must be minimum of 2 character length',
  emptyObject: 'Please fill out all fields',
};

const isObject = (item) => {
  return !!(
    typeof item === 'object' &&
    !Array.isArray(item) &&
    item !== null &&
    Object.entries(item).length
  );
};

const constructErrorMessages = (message, key) =>
  `${key ? key : ''} ${errorMessages[message]}`;

const validateInput = (key, value, validators) => {
  const validatorKey = validators[key];
  if (validatorKey) {
    return [validatorKey(value), key];
  }
  return [validators.len(value), 'len', key];
};

module.exports = {
  errorMessages,
  isObject,
  constructErrorMessages,
  validateInput,
};

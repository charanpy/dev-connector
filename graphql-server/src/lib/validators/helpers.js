const socialLink = [
  'github',
  // 'link',
  'instagram',
  'twitter',
  // 'website',
  // 'projectLink',
  'githubLink',
];

const errorMessages = {
  email: 'Enter valid email',
  password:
    'Password must contain one lowercase,one special character and minimum length of 6',
  len: 'must be minimum of 2 character length',
  emptyObject: 'Please fill out all fields',
  link: 'Invalid link',
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
  console.log(key, value);
  const validatorKey = validators[key];
  if (validatorKey) {
    return [validatorKey(value), key];
  }
  if (socialLink.includes(key)) {
    return [
      validators.link(socialLink === 'githubLink' ? 'github' : key, value),
      'link',
      key,
    ];
  }
  return [validators.len(value), 'len', key];
};

module.exports = {
  errorMessages,
  isObject,
  constructErrorMessages,
  validateInput,
};

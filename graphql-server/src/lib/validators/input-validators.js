const validator = require('validator');

const passwordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
};

const emailValidator = (email) => validator.isEmail(email);

const passwordValidtor = (password) =>
  validator.isStrongPassword(password, passwordOptions);

const lengthValidator = (username) => validator.isLength(username, { min: 2 });

const linkValidator = (socialMedia, userLinkField) => {
  console.log(socialMedia, userLinkField, 23);
  return userLinkField.startsWith(`https://${socialMedia}.com/`);
};

const validators = {
  email: emailValidator,
  password: passwordValidtor,
  len: lengthValidator,
  link: linkValidator,
};

module.exports = {
  validators,
};

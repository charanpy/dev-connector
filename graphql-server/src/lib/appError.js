const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data ${errors.join('.')}`;
  return [message]; //400
};

const handleCastErrorDb = (err) => {
  const message =
    `Invalid ${err.path} : ${err.value}.` +
    'The requested data is not available';
  return [message]; //400
};

const handleDuplicateFieldErrorDb = (error) => {
  const keyField = Object.keys(error.keyValue)[0]; // 400
  return [`Please use different ${keyField}`];
};

const appError = (error) => {
  if (!error) {
    return ['Server error']; // 500
  }
  if (error.code === 11000) {
    return handleDuplicateFieldErrorDb(error);
  }
  if (error.name === 'ValidationError') {
    return handleValidationError(error);
  }

  if (error.name === 'CastError' || error.kind === 'ObjectId')
    return handleCastErrorDb(error);

  return [error?.message || error?.name || 'Server error'];
};

module.exports = appError;

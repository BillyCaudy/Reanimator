const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.bodyText = validText(data.bodyText) ? data.bodyText : '';

  if (Validator.isEmpty(data.bodyText)) errors.bodyText = 'Comment cannot be empty';

  if (!Validator.isLength(data.bodyText, { min: 2, max: 150 })) {
    errors.text = 'Comment must be between 2 and 150 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

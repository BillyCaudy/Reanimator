const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCollectionInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 1, max: 40 })) {
    errors.text = 'Title must be between 1 and 40 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

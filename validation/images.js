const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateImageInput(data) {
  let errors = {};

  data.imgName = validText(data.imgName) ? data.imgName : '';
  data.imgUrl = validText(data.imgUrl) ? data.imgUrl : '';

  if (Validator.isEmpty(data.imgUrl)) errors.imgUrl = 'Url cannot be empty';

  if (!Validator.isLength(data.imgName, { min: 1, max: 40 })) {
    errors.text = 'Image name must be between 1 and 40 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

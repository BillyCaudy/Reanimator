const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateChirpInput(data) {
  let errors = {};

  data.body = validText(data.body) ? data.body : "";

  if (!Validator.isLength(data.body, { min: 1, max: 280 })) {
    errors.body = "Chirps must be between 1 and 280 characters";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = "Chirps can't be blank.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

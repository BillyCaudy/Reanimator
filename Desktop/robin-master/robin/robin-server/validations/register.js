const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.handle = validText(data.handle) ? data.handle : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.handle) ? data.password2 : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 20 })) {
    errors.hanlde = "Robin Handles must be between 2 and 20 characters.";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.hanlde = "Handle Field is required.";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required.";
  }
  //   if (!Validator.isEmail(data.email)) {
  //     errors.email = "Email is invalid.";
  //   }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is required.";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 300 })) {
    errors.password = "Passwords must be at least 6 charcaters in length.";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords don't match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

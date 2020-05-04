const validator = require("validator");
const isEmpty = require("./is-empty");

const validateRegisterInput = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name's length should be between 2 and 30!";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password's length should be between 6 & 30";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Confirm password doesn't match password";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;

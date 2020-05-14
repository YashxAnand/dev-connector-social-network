const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validatePostInput = data => {
  const errors = {};

  if (isEmpty(data.text)) {
    errors.text = "Post cannot be empty";
  } else {
    if (!validator.isLength(data.text, { min: 2, max: 300 })) {
      errors.text = "Post's length should be between 2 & 300";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

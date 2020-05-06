const isEmpty = require("./is-empty");

module.exports = validateExperienceInput = (data) => {
  const errors = {};

  if (isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (isEmpty(data.company)) {
    errors.company = "Company is required";
  }

  if (isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const isEmpty = require("./is-empty");

module.exports = validateEducationInput = data => {
  const errors = {};

  if (isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  if (isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  if (isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validator = require("validator");
const isEmpty = require("./is-empty");

const validateProfileInput = data => {
  const errors = {};

  if (isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  } else {
    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
      errors.handle = "Handle's length should be between 2 and 40";
    }
  }

  if (isEmpty(data.skills)) {
    errors.skills = "Skills are required";
  }

  if (isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Website URL not valid";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "youtube URL not valid";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "twitter URL not valid";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "facebook URL not valid";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "instagram URL not valid";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "linkedin URL not valid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateProfileInput;

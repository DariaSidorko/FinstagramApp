const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateProfileInput(data) {
  let errors = {};

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = 'Bio field is required';
  } 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

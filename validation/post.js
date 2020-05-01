const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  // text field validation
  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 2, max: 200 })) {
    errors.text = 'Post must be between 2 and 200 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  //image field validation
  data.image = !isEmpty(data.image) ? data.image : '';

  if (!Validator.isURL(data.image)) {
    errors.image = 'Invalid URL link';
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = 'Image field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
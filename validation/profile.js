const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateProfileInput(data) {
  let errors = {};

/*   data.handle = !isEmpty(data.handle) ? data.handle : '';
  
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'User name needs to between 2 and 40 characters';
  } */
 

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

/*   if (Validator.isEmpty(data.bio)) {
    errors.bio = 'Skills field is required';
  } */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

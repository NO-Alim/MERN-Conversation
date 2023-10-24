const { check, bail, validationResult } = require('express-validator');

// check
const loginValidators = [
  check('userName')
    .isLength({
      min: 1,
    })
    .withMessage('Mobile number or email address is required!'),
  check('password')
    .isLength({
      min: 1,
    })
    .withMessage('password is required!'),
];

// handle error
const loginValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(501).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  loginValidators,
  loginValidationHandler,
};

const { check, bail, validationResult } = require('express-validator');

// checking
const registrationValidators = [
  check('name').not().isEmpty().withMessage('name is required'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('email is required')
    .bail()
    // if email is empty, the following will not be run
    .isEmail()
    .withMessage('email not valid'),
  check('mobile')
    .not()
    .isEmpty()
    .bail()
    .withMessage('Mobile number required!')
    .isLength({
      min: 11,
    })
    .withMessage('Mobile must be at list 11 digit')
    .bail()
    .trim()
    .isNumeric()
    .withMessage('Only Decimals allowed'),
  check('password').not().isEmpty().withMessage('password is required!'),
  // .bail()
  // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
  // .withMessage(
  //   'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long'
  // ),
];
// handle error

const registrationValidationHandler = (req, res, next) => {
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

module.exports = { registrationValidators, registrationValidationHandler };

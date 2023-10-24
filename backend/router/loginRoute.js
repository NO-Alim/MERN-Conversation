const express = require('express');
const {
  loginUser,
  registerUser,
  logoutUser,
} = require('../controller/loginController');
const {
  loginValidators,
  loginValidationHandler,
} = require('../middlewares/login/loginValidators');
const {
  registrationValidators,
  registrationValidationHandler,
} = require('../middlewares/login/registrationValidators');

const router = express.Router();

// login user
// @public route
router.post('/login', loginValidators, loginValidationHandler, loginUser);

// register user
// @public route
router.post(
  '/register',
  registrationValidators,
  registrationValidationHandler,
  registerUser
);

// logout
// @private route
router.delete('/logout', logoutUser);

module.exports = router;

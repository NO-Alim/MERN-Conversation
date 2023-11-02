const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/People');

const loginCheck = asyncHandler(async (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookies) {
    try {
      token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401);
      res.json({
        errors: {
          common: {
            msg: error,
          },
        },
      });
    }
  } else {
    res.status(401);
    res.json({
      errors: {
        common: {
          msg: 'No Cookie Found.',
        },
      },
    });
  }
});

module.exports = { loginCheck };

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const generateToken = require('../utilities/generateToken');
const User = (require = require('../models/People'));

// login user
// @public route
const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  // get user
  const user = await User.findOne({
    $or: [
      {
        email: userName,
      },
      {
        mobile: userName,
      },
    ],
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    // generate cookies
    const token = generateToken({
      id: user._id,
      name: user.name,
    });
    // set cookies
    res
      .cookie(process.env.COOKIE_NAME, token, {
        maxAge: process.env.JWT_EXPIRY,
        httpOnly: true,
        signed: true,
        sameSite: 'strict',
      })
      .status(201)
      .json({
        id: user._id,
        name: user.name,
      });
  } else {
    res.status(400).json({
      errors: {
        common: {
          msg: 'Invalid user data',
        },
      },
    });
  }
});

// register user
// @public route
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  // check if user exist
  const userExist = await User.findOne(
    {
      $or: [
        {
          email,
        },
        {
          mobile,
        },
      ],
    },
    'name'
  );
  if (userExist) {
    res.status(400).json({
      errors: {
        common: {
          msg: 'User already exist',
        },
      },
    });
  } else {
    let newUser;
    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    if (user) {
      // generate cookies
      const token = generateToken({
        id: user._id,
        name: user.name,
      });
      // set cookies
      res.cookie(process.env.COOKIE_NAME, token, {
        maxAge: process.env.JWT_EXPIRY,
        httpOnly: true,
        signed: true,
      });

      // response
      res.status(201).json({
        id: user._id,
        name: user.name,
      });
    } else {
      res.status(400).json({
        errors: {
          common: {
            msg: 'unknown error!',
          },
        },
      });
    }
  }
});

// logout user
// @private route
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({
    response: 'logout successfully',
  });
});

module.exports = { loginUser, registerUser, logoutUser };

const express = require('express');
const { getUsers, searchUser } = require('../controller/usersController');
const { loginCheck } = require('../middlewares/common/authMiddleware');

const router = express.Router();
//@ '/users'

// get request
// private route
router.get('/', loginCheck, getUsers);

// get request
// body {searchString}
// private route
router.get('/search', loginCheck, searchUser);

module.exports = router;

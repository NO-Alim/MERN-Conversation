const express = require('express');
const { loginCheck } = require('../middlewares/common/authMiddleware');
const {
  addConversation,
  getConversation,
} = require('../controller/conversationController');

const router = express.Router();

// add a conversation
// post method
// @private
router.post('/', loginCheck, addConversation);
router.get('/', loginCheck, getConversation);

module.exports = router;

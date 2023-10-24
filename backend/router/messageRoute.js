const express = require('express');
const { loginCheck } = require('../middlewares/common/authMiddleware');
const { sendMessage, getMessage } = require('../controller/messageController');
const attachmentUpload = require('../middlewares/inbox/attachmentUpload');

const router = express.Router();

// get message specific conversation_id
// get method
// @private
router.get('/:conversation_id', loginCheck, getMessage);

// send a message
// post method
// @private
router.post('/', loginCheck, attachmentUpload, sendMessage);

module.exports = router;

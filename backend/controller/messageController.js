const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const convertObjectId = require('../utilities/mongooseObjectedId');
const Conversation = require('../models/Conversation');
// get message specific conversation_id
// get method
// @private
const getMessage = asyncHandler(async (req, res) => {
  const { timeStamp, limit } = req.query;
  // conditional query
  const query = timeStamp
    ? {
        conversation: convertObjectId(req.params.conversation_id),
        data_time: { $lt: timeStamp },
      }
    : {
        conversation: convertObjectId(req.params.conversation_id),
      };
  const messages = await Message.find(query)
    .sort('-data_time')
    .limit(limit)
    .populate({ path: 'sender', select: ['name', 'avatar'] })
    .populate({ path: 'receiver', select: ['name', 'avatar'] });
  res.status(200).json(messages);
});

// send a message
// post method
// @private
const sendMessage = asyncHandler(async (req, res) => {
  const sender = req.user.id;
  const { message, receiverId, conversation_id } = req.body;
  if (req.body.message || (req.files && req.files.length > 0)) {
    let attachment = null;
    if (req.files && req.files.length > 0) {
      attachment = [];

      req.files.forEach((file) => {
        attachment.push(
          //must be change after host
          `http://localhost:5000/static/uploads/avatars/${file.filename}`
        );
      });
    }

    const newMessage = await Message.create({
      text: message,
      attachment: attachment,
      sender: sender,
      receiver: receiverId,
      conversation: conversation_id,
    });
    // update conversation timestamp
    const editConversation = await Conversation.findByIdAndUpdate(
      conversation_id,
      {
        last_updated: newMessage.data_time,
        last_message: newMessage.text,
      }
    );
    // emit socket event
    if (global?.io) {
      global.io.emit('message', newMessage);
    }
    //
    res.status(200).json(newMessage);
  } else {
  }
});

module.exports = { sendMessage, getMessage };

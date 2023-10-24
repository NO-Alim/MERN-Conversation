const asyncHandler = require('express-async-handler');
const Conversations = require('../models/Conversation');
const { locales } = require('moment');

// add a conversation
// post method
// @private
const addConversation = asyncHandler(async (req, res) => {
  const creator = req.user.id;
  const { participant } = req.body;
  const existConversation = await Conversations.findOne({
    $or: [
      {
        creator: creator,
        participant: participant,
      },
      {
        creator: participant,
        participant: creator,
      },
    ],
  })
    .populate({ path: 'creator', select: ['name', 'avatar'] })
    .populate({ path: 'participant', select: ['name', 'avatar'] });
  if (!existConversation) {
    const newConversation = await Conversations.create({
      creator,
      participant,
    });
    // this is only for ref name because newConversation doesn't contain reference name
    const savedConversation = await Conversations.findById(newConversation._id)
      .populate({ path: 'creator', select: ['name', 'avatar'] })
      .populate({ path: 'participant', select: ['name', 'avatar'] });

    if (newConversation && savedConversation) {
      // socket
      if (global?.io && savedConversation) {
        //createConversation
        global.io.emit('createConversation', savedConversation);
      }
      res.status(200).json(savedConversation);
    } else {
      res.status(500).json({
        errors: {
          common: {
            msg: 'Internal Server Error',
          },
        },
      });
    }
  } else {
    res.status(200).json(existConversation);
  }
});

// all conversation
// get method
// @private
const getConversation = asyncHandler(async (req, res) => {
  const user = req.user.id;
  const myConversation = await Conversations.find({
    $or: [
      {
        creator: user,
      },
      {
        participant: user,
      },
    ],
  })
    .sort('-last_updated')
    .populate({ path: 'creator', select: ['name', 'avatar'] })
    .populate({ path: 'participant', select: ['name', 'avatar'] });
  res.status(200).json(myConversation);
});

module.exports = { addConversation, getConversation };

const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
      required: true,
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
      required: true,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
    last_message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;

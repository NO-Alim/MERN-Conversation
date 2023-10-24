const mongoose = require('mongoose');

const friendShipSchema = mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const FriendShip = mongoose.model('FriendShip', friendShipSchema);

module.exports = FriendShip;

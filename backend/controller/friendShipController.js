const asyncHandler = require('express-async-handler');
const Friends = require('../models/FriendShip');
const User = require('../models/People');

//get accepted friend
// get method
const getAllFriend = asyncHandler(async (req, res) => {
  const friendShip = await Friends.find({
    $and: [
      {
        $or: [
          {
            requester: req.user.id,
          },
          {
            recipient: req.user.id,
          },
        ],
      },
      {
        status: 'accepted',
      },
    ],
  })
    .populate({ path: 'requester', select: ['name', 'avatar'] })
    .populate({ path: 'recipient', select: ['name', 'avatar'] });
  res.status(200).json({
    friendShip,
  });
});

//get unaccepted friend
// get method
const requestedFriend = asyncHandler(async (req, res) => {
  const friendShip = await Friends.find({
    $and: [
      {
        $or: [
          {
            requester: req.user.id,
          },
          {
            recipient: req.user.id,
          },
        ],
      },
      {
        status: 'pending',
      },
    ],
  })
    .populate({ path: 'requester', select: ['name', 'avatar'] })
    .populate({ path: 'recipient', select: ['name', 'avatar'] });
  res.status(200).json({
    friendShip,
  });
});

//send friend request
// post method

const sendFriendRequest = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;
  if (receiverId && senderId) {
    // check sender has
    const receiver = await User.find(
      {
        _id: receiverId,
      },
      'name'
    );
    if (receiver?.length > 0) {
      // check is it already exist
      const existFriendShip = await Friends.findOne({
        $or: [
          {
            requester: senderId,
            recipient: receiverId,
          },
          {
            requester: receiverId,
            recipient: senderId,
          },
        ],
      });

      if (!existFriendShip) {
        // save FriendRequest
        const FriendShip = await Friends.create({
          requester: senderId,
          recipient: receiverId,
        });

        const savedFriend = await Friends.findOne({
          requester: senderId,
          recipient: receiverId,
        })
          .populate({ path: 'requester', select: ['name', 'avatar'] })
          .populate({ path: 'recipient', select: ['name', 'avatar'] });

        if (savedFriend) {
          // FriendShip return only requester and recipient id that's why again call findOne which also return name avatar

          // socket
          if (global?.io) {
            global.io.emit('sendFriendRequest', savedFriend);
          }
          // here should be return FriendShip but there have a issue, see uper comment
          res.status(200).json(savedFriend);
        } else {
          throw new Error('Internal server error!');
        }
      } else {
        throw new Error('Friend Request Already send!');
      }
    } else {
      throw new Error('Invalid Receiver');
    }
  } else {
    throw new Error('please provide all data');
  }
});

//accept friend request
// patch method
// check you are request receiver

const acceptRequest = asyncHandler(async (req, res) => {
  const { friendShipId } = req.body;
  if (friendShipId) {
    const friendShip = await Friends.findOne({
      _id: friendShipId,
    });
    // check is there friendship
    if (friendShip) {
      // check are you receiver of this request
      if (friendShip?.recipient.toString() === req.user.id) {
        const editedFriendShip = await Friends.findByIdAndUpdate(
          friendShipId,
          {
            status: 'accepted',
          },
          {
            new: true,
          }
        )
          .populate({ path: 'requester', select: ['name', 'avatar'] })
          .populate({ path: 'recipient', select: ['name', 'avatar'] });
        // emit socket
        if (global?.io) {
          global.io.emit('acceptRequest', editedFriendShip);
        }
        res.status(200).json({
          editedFriendShip,
        });
      } else {
        throw new Error('Invalid Author');
      }
    } else {
      throw new Error('No Friendship found');
    }
  } else {
    throw new Error('please provide a Id');
  }
  // find friendship and update
});

// delete friend request
// delete method
const cancelRequest = asyncHandler(async (req, res) => {
  const { friendShipId } = req.body;
  if (friendShipId) {
    const friendShip = await Friends.findOne({
      _id: friendShipId,
    });
    // check is there friendship
    if (friendShip) {
      // check are you requester of this request
      if (
        req.user.id === friendShip?.requester.toString() ||
        friendShip?.recipient.toString()
      ) {
        // delete here
        const deletedFriendReq = await Friends.findOneAndDelete({
          _id: friendShipId,
        })
          .populate({ path: 'requester', select: ['name', 'avatar'] })
          .populate({ path: 'recipient', select: ['name', 'avatar'] });
        if (global?.io) {
          global.io.emit('deleteFriendRequest', deletedFriendReq);
        }
        res.status(200).json({
          deletedFriendReq,
        });
      } else {
        throw new Error('Invalid Author');
      }
    } else {
      throw new Error('No Friendship found');
    }
  } else {
    throw new Error('please provide a Id');
  }
});

module.exports = {
  getAllFriend,
  requestedFriend,
  sendFriendRequest,
  acceptRequest,
  cancelRequest,
};

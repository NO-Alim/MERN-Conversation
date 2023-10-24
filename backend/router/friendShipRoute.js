const express = require('express');
const {
  getAllFriend,
  requestedFriend,
  sendFriendRequest,
  acceptRequest,
  cancelRequest,
} = require('../controller/friendShipController');
const { loginCheck } = require('../middlewares/common/authMiddleware');

const router = express.Router();

//get accepted friend
// get method

router.get('/', loginCheck, getAllFriend);

//get requested and received requested friend
// get method
router.get('/request', loginCheck, requestedFriend);

//send friend request
// post method
router.post('/', loginCheck, sendFriendRequest);

//accept friend request
// patch method
// check you are request receiver
router.put('/', loginCheck, acceptRequest);

// delete friend request
// delete method
router.delete('/', loginCheck, cancelRequest);

module.exports = router;

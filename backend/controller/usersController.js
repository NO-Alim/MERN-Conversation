const asyncHandler = require('express-async-handler');
const User = require('../models/People');
const Friends = require('../models/FriendShip');
const escape = require('../utilities/escape');

// get user
// @GET request
// @private route

const getUsers = asyncHandler(async (req, res) => {
  // get all of yours requested/received/accepted request
  const userId = req.user.id;
  const FriendShip = await Friends.find({
    $or: [
      {
        requester: req.user.id,
      },
      {
        recipient: req.user.id,
      },
    ],
  });

  // all ids requested/received/accepted request
  const friendsIds = FriendShip.map((item) => [
    item.requester.toString(),
    item.recipient.toString(),
  ]).flat();

  let uniqueFriendsIds = [...new Set(friendsIds), userId];
  const users = await User.find({ _id: { $nin: uniqueFriendsIds } }, 'name');
  res.status(200).json({
    users,
  });
});

// search user
// @GET request
// @private route
// body {searchString}
const searchUser = asyncHandler(async (req, res) => {
  const { searchString } = req.body;
  if (searchString !== undefined || null || '') {
    const name_search_regex = new RegExp(escape(searchString), 'i');
    const mobile_search_regex = new RegExp('^' + escape(searchString));
    const email_search_regex = new RegExp(
      '^' + escape(searchString) + '$',
      'i'
    );
    const users = await User.find(
      {
        $or: [
          {
            name: name_search_regex,
          },
          {
            mobile: mobile_search_regex,
          },
          {
            email: email_search_regex,
          },
        ],
      },
      'name'
    );
    res.status(200).json({
      users,
    });
  } else {
    throw new Error('Please add some text');
  }
});

module.exports = { getUsers, searchUser };

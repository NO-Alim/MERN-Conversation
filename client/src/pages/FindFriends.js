import React from 'react';
import FindFriendList from '../component/FindFriend/FindFriendList';
import PendingFriends from '../component/FindFriend/PendingFriends';
const FindFriends = () => {
  return (
    <div className=" mt-2 px-2 overflow-y-scroll h-[calc(100vh_-_121px)] scrollbar-hide space-y-2">
      <PendingFriends />
      <FindFriendList />
    </div>
  );
};

export default FindFriends;

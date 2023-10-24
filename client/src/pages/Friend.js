import React from 'react';
import FriendList from '../component/Friend/FriendList';

const Friend = () => {
  return (
    <div className="mt-2 px-2 overflow-y-scroll h-[calc(100vh_-_121px)] scrollbar-hide space-y-2">
      <FriendList />
    </div>
  );
};

export default Friend;

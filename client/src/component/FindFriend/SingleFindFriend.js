import React from 'react';
import fakeUser from '../../assets/images/user.png';
import { useSendFriendRequestMutation } from '../../features/friends/friendsApi';

const SingleFindFriend = ({ user }) => {
  const { _id, name } = user;
  const [sendFriendRequest, { data, isLoading, isError, error: resError }] =
    useSendFriendRequestMutation();

  const handleRequest = () => {
    sendFriendRequest({
      receiverId: _id,
    });
  };
  return (
    <div className=" bg-slate-900 bg-opacity-20 rounded-md p-2">
      <div className=" flex flex-row gap-3 items-center">
        <img
          className=" rounded-full w-14 h-14 overflow-hidden"
          src={fakeUser}
          alt=""
        />
        <div className=" space-y-2">
          <h1 className="text-xl font-semibold text-white">{name}</h1>

          <button
            className="bg-slate-900 hover:bg-teal-700 text-white font-semibold py-1 sm:py-2 px-2 sm:px-4 rounded text-sm sm:text-md"
            onClick={handleRequest}
          >
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleFindFriend;

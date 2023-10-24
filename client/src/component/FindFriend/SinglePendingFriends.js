import React from 'react';
import { useSelector } from 'react-redux';
import fakeUser from '../../assets/images/user.png';
import {
  useAcceptRequestMutation,
  useDeleteRequestMutation,
} from '../../features/friends/friendsApi';
const SinglePendingFriends = ({ item }) => {
  const { recipient, requester, _id: friendShipId } = item;
  const { id } = useSelector((state) => state.auth.user);
  const [
    acceptRequest,
    { isLoading: acceptLoading, isError: isAcceptError, error: acceptError },
  ] = useAcceptRequestMutation();
  const [
    deleteRequest,
    { isLoading: deleteLoading, isError: isDeleteError, error: deleteError },
  ] = useDeleteRequestMutation();

  const handleAcceptRequest = () => {
    acceptRequest({
      friendShipId,
    });
  };

  const cancelFriendRequest = () => {
    deleteRequest({
      friendShipId,
      userId: id,
    });
  };
  //
  let content;

  if (recipient._id === id) {
    // if recipient is me
    content = (
      <div className=" flex gap-5 items-center bg-slate-900 bg-opacity-30 bg p-2 rounded-md">
        <div>
          <img
            className=" w-10 h-10 rounded-full object-contain bg-slate-400"
            src={fakeUser}
            alt={requester.name}
          />
        </div>
        <div className=" space-y-3">
          <h2 className="text-xl font-semibold">{requester.name}</h2>
          <div className=" space-x-1">
            <button
              className=" bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded"
              disabled={acceptLoading}
              onClick={handleAcceptRequest}
            >
              Accept
            </button>
            <button
              className=" bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded"
              disabled={deleteLoading}
              onClick={cancelFriendRequest}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className=" flex gap-5 items-center bg-slate-900 bg-opacity-30 bg p-2 rounded-md">
        <div>
          <img
            className=" w-10 h-10 rounded-full object-contain bg-slate-400"
            src={fakeUser}
            alt={recipient.name}
          />
        </div>
        <div className=" space-y-3">
          <h2 className=" text-xl font-semibold">{recipient.name}</h2>
          <button
            className=" bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded"
            disabled={deleteLoading}
            onClick={cancelFriendRequest}
          >
            cancel Request
          </button>
        </div>
      </div>
    );
  }
  return content;
};

export default SinglePendingFriends;

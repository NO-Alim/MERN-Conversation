import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllRequestedFriendQuery } from '../../features/friends/friendsApi';
import Error from '../../ui/Error';
import LoadingSpin from '../../ui/LoadingSpin';
import SinglePendingFriends from './SinglePendingFriends';
const PendingFriends = () => {
  const { id: userId } = useSelector((state) => state.auth.user);
  const {
    data,
    isLoading,
    isError,
    error: resError,
  } = useGetAllRequestedFriendQuery(userId);

  const [error, setError] = useState('');

  useEffect(() => {
    if (resError?.error) {
      setError(resError.error);
    }
    if (resError?.data) {
      const { errors } = resError.data;
      const keys = Object.keys(errors);
      if (keys?.length > 0) {
        let err = '';
        keys.map((key) => {
          err = err + ' ' + errors[key].msg;
        });
        setError(err);
      }
    }
  }, [resError]);

  let content;

  // loading
  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <LoadingSpin />
      </div>
    );
  }

  // error
  if (!isLoading && isError) {
    content = (
      <div className="flex justify-center items-center">
        <Error message={error} />
      </div>
    );
  }

  // no user find
  if (!isLoading && !isError && data?.friendShip?.length === 0) {
    content = null;
  }
  // user find
  if (!isLoading && !isError && data?.friendShip?.length > 0) {
    content = (
      <div className=" flex flex-col gap-5">
        {data.friendShip.map((item) => (
          <SinglePendingFriends key={item._id} item={item} />
        ))}
      </div>
    );
  }
  return content;
};

export default PendingFriends;

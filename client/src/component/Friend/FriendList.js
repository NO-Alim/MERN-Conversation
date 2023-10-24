import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllFriendQuery } from '../../features/friends/friendsApi';
import Error from '../../ui/Error';
import LoadingSpin from '../../ui/LoadingSpin';
import SingleFriend from './SingleFriend';

const FriendList = () => {
  const { id: userId } = useSelector((state) => state.auth.user);
  const {
    data,
    isLoading,
    isError,
    error: resError,
  } = useGetAllFriendQuery(userId);
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
      <div className="h-full w-full flex items-center justify-center">
        <LoadingSpin />
      </div>
    );
  }

  // error
  if (!isLoading && error) {
    content = (
      <div className="h-full w-full flex items-center justify-center">
        <Error message={error} />
      </div>
    );
  }

  // no user find
  if (!isLoading && !isError && data?.friendShip?.length === 0) {
    content = (
      <div className="h-full w-full flex items-center justify-center">
        <h1 className=" text-lg font-semibold text-white">No Friend Found</h1>
      </div>
    );
  }
  // user find
  if (!isLoading && !isError && data?.friendShip?.length > 0) {
    content = (
      <div className=" flex flex-col gap-5 h-full">
        {data.friendShip.map((item) => (
          <SingleFriend key={item._id} item={item} />
        ))}
      </div>
    );
  }
  return <div className=" space-y-2">{content}</div>;
};

export default FriendList;

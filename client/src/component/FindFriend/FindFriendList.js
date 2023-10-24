import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUsersQuery } from '../../features/users/usersApi';
import Error from '../../ui/Error';
import LoadingSpin from '../../ui/LoadingSpin';
import SingleFindFriend from './SingleFindFriend';

const FindFriendList = () => {
  const { id: userId } = useSelector((state) => state.auth.user);
  const {
    data,
    isLoading,
    isError,
    error: resError,
  } = useGetUsersQuery(userId);
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

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <LoadingSpin />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = (
      <div className="flex justify-center items-center">
        <Error message={error} />
      </div>
    );
  }
  if (!isLoading && !isError & (data?.length < 1)) {
    content = (
      <div className="flex justify-center items-center">
        <h1>No User Found.</h1>
      </div>
    );
  }

  // no user find
  if (!isLoading && !isError && data?.users?.length === 0) {
    content = (
      <h1 className="text-lg text-center text-white font-semibold">
        No User Found to Add.
      </h1>
    );
  }

  // user find
  if (!isLoading && !isError && data?.users?.length > 0) {
    content = (
      <div className=" space-y-2">
        {data.users.map((item) => (
          <SingleFindFriend key={item._id} user={item} />
        ))}
      </div>
    );
  }
  return <>{content}</>;
};

export default FindFriendList;

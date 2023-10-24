import React, { useEffect, useState } from 'react';
import { useGetMessageQuery } from '../../features/message/messageApi';
import Error from '../../ui/Error';
import Messages from './Messages';

const MessagesContainer = ({ createdData }) => {
  const { _id } = createdData || {};

  const {
    data: resData,
    isLoading,
    isError,
    error: resError,
  } = useGetMessageQuery(_id);
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
    content = null;
  } else if (!isLoading && isError) {
    content = (
      <div className="flex items-center justify-center h-full">
        <Error message={error} />
      </div>
    );
  } else if (!isLoading && !isError && resData.length === 0) {
    content = (
      <div className=" flex items-center justify-center">
        <h1 className="text-xl text-white font-semibold">No Message Found!</h1>
      </div>
    );
  } else if (!isLoading && !isError && resData.length > 0) {
    content = <Messages messages={resData} />;
  }
  return <div className=" flex-1 px-4 py-2">{content}</div>;
};

export default MessagesContainer;

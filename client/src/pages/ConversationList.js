import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConvList from '../component/ConversationList/ConvList';
import { useGetAllConversationQuery } from '../features/conversation/conversationApi';
import Error from '../ui/Error';
import LoadingSpin from '../ui/LoadingSpin';

const ConversationList = () => {
  const { id: userId } = useSelector((state) => state.auth.user);

  const {
    data,
    isLoading,
    isError,
    error: resError,
  } = useGetAllConversationQuery(userId);
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

  if (!isLoading && !isError && data?.length === 0) {
    content = (
      <div className="flex justify-center items-center text-white text-lg">
        No Conversation Found
      </div>
    );
  }

  if (!isLoading && !isError && data?.length > 0) {
    content = <ConvList list={data} />;
  }
  return (
    <div className=" mt-2 px-2 overflow-y-scroll h-[calc(100vh_-_121px)] scrollbar-hide space-y-2">
      {content}
    </div>
  );
};

export default ConversationList;

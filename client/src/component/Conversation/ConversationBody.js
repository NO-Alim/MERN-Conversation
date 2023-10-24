import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useCreateConversationMutation } from '../../features/conversation/conversationApi';
import Error from '../../ui/Error';
import LoadingSpin from '../../ui/LoadingSpin';
import MessageForm from './MessageForm';
import MessageHeader from './MessageHeader';
import MessagesContainer from './MessagesContainer';

const ConversationBody = () => {
  const { id } = useParams();
  const { id: userId } = useSelector((state) => state.auth.user);

  const [error, setError] = useState('');

  // if no conversation found, post conversation & get the conversation & pass through chatBody, chatHead
  const [
    createConversation,
    {
      data: createdData,
      isLoading: isCreateLoading,
      isError: isCreateError,
      error: createError,
    },
  ] = useCreateConversationMutation(id);

  const handleCreateRequest = () => {
    createConversation({
      creator: userId,
      participant: id,
      last_updated: Date.now(),
    });
  };

  useEffect(() => {
    if (id) {
      handleCreateRequest();
    }
  }, [id]);

  // error handle
  useEffect(() => {
    if (createError && createError !== undefined) {
      const errors =
        createError?.data?.errors || 'Something Error in This site!!';
      const keys = Object.keys(errors);
      if (keys?.length > 0) {
        let err = '';
        keys.map((key) => {
          err = err + ' ' + errors[key].msg;
        });
        setError(err);
      }
    }
  }, [createError]);

  //
  let content;
  if (isCreateLoading) {
    content = (
      <div className="flex items-center justify-center h-full">
        <LoadingSpin />
      </div>
    );
  } else if (!isCreateLoading && isCreateError) {
    content = (
      <div className="flex items-center justify-center h-full">
        <Error message={error} />
      </div>
    );
  } else if (!isCreateLoading && !isCreateError && createdData) {
    content = (
      <div className="w-full h-full flex flex-col justify-between">
        <MessageHeader createdData={createdData} />
        <MessagesContainer createdData={createdData} />
        <MessageForm createdData={createdData} />
      </div>
    );
  }
  return content;
};

export default ConversationBody;

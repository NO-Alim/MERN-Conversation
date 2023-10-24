import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { setLastMessageTimeStamp } from '../../features/lastMessage/lastMessageTimeStampSlice';
import { messageApi } from '../../features/message/messageApi';
import LoadingSpin from '../../ui/LoadingSpin';
import SingleMessage from './SingleMessage';

const Messages = ({ messages }) => {
  const [hashedMore, setHashedMore] = useState(false);
  const { lastMessageTimeStamp } = useSelector(
    (state) => state.lastMessageTimeStamp
  );
  const dispatch = useDispatch();
  const lastMessageTime = messages[messages.length - 1].data_time;
  const handleLastMessageTimeStamp = () => {
    dispatch(setLastMessageTimeStamp(lastMessageTime));
  };

  const fetchMore = () => {
    dispatch(
      messageApi.endpoints.getMoreMessage.initiate({
        conversation_id: messages[0].conversation,
        lastMessageTime: lastMessageTime,
        limit: 10,
      })
    );
  };
  useEffect(() => {
    setHashedMore(lastMessageTimeStamp !== lastMessageTime);
    handleLastMessageTimeStamp();
  }, [messages]);
  return (
    <div>
      <InfiniteScroll
        dataLength={messages?.length}
        next={fetchMore}
        hasMore={hashedMore}
        style={{
          display: 'flex',
          gap: '5px',
          flexDirection: 'column-reverse',
        }}
        inverse={true}
        height={window.innerHeight - 200}
        loader={
          <div className="flex justify-center items-center">
            <LoadingSpin />
          </div>
        }
      >
        {messages.map((message) => {
          return <SingleMessage key={message._id} message={message} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Messages;

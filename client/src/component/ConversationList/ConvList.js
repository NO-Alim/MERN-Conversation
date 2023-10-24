import React from 'react';
import { useSelector } from 'react-redux';
import SingleConversation from './SingleConversation';

const ConvList = ({ list }) => {
  const { id: userId } = useSelector((state) => state.auth.user);
  return (
    <div className=" space-y-2">
      {list.map((item) => {
        const participant =
          item.participant._id === userId ? item.creator : item.participant;
        return (
          <SingleConversation
            participant={participant}
            item={item}
            key={item._id}
          />
        );
      })}
    </div>
  );
};

export default ConvList;

import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import fakeUser from '../../assets/images/user.png';
const SingleConversation = ({ participant, item }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/conversation/${participant._id}`);
  };
  return (
    <div
      className=" bg-slate-900 bg-opacity-20 rounded-md p-2 cursor-pointer"
      onClick={() => handleClick(1)}
    >
      <div className=" flex flex-row gap-3 items-center">
        <img
          className=" rounded-full w-14 h-14 overflow-hidden"
          src={fakeUser}
          alt=""
        />
        <div className=" space-y-2">
          <h1 className="text-xl font-semibold text-white">
            {participant?.name}
          </h1>
          <h3 className="text-md font-semibold text-white">
            {item?.last_message}
          </h3>
          <p className=" text-white text-opacity-50">
            {moment(item.last_updated).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleConversation;

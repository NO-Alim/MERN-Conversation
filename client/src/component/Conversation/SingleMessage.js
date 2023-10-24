import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

const SingleMessage = ({ message }) => {
  const { id: userId } = useSelector((state) => state.auth.user);
  let justify;
  if (message.sender._id === undefined) {
    justify = message.sender !== userId ? 'start' : 'end';
  } else {
    justify = message.sender._id !== userId ? 'start' : 'end';
  }
  return (
    <li className={`flex justify-${justify}`}>
      <div className="relative bg-teal-800 text-white max-w-xl px-4 py-2 rounded shadow">
        <span className="block">{message?.text}</span>
        {message?.attachment &&
          message.attachment.length > 0 &&
          message.attachment.map((item, ind) => {
            return <img src={item} alt="item" key={ind} />;
          })}
        <span className=" text-sm text-slate-400">
          {moment(message?.data_time).calendar()}
        </span>
      </div>
    </li>
  );
};

export default SingleMessage;

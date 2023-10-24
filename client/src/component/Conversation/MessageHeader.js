import { useWindowWidth } from '@react-hook/window-size';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MessageHeader = ({ createdData }) => {
  const width = useWindowWidth();

  const { id: userId } = useSelector((state) => state.auth.user);
  const { participant, creator } = createdData || {};

  const name = participant._id === userId ? creator.name : participant.name;

  return (
    <div className="h-[60px] bg-slate-900 md:border-l border-teal-500 w-full flex px-10 sm:pl-24 justify-between md:justify-center items-center">
      {width > 767 ? null : (
        <Link to="/conversations" className="">
          <i className="text-teal-500">
            <FaArrowLeft />
          </i>
        </Link>
      )}
      <h1 className=" text-teal-500 text-xl md:text-2xl font-bold text-center">
        {name}
      </h1>
    </div>
  );
};

export default MessageHeader;

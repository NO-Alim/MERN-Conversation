import React from 'react';
import { BiChat } from 'react-icons/bi';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const BottomNav = () => {
  return (
    <div className=" h-[60px] bg-slate-900 text-teal-500 flex justify-around items-center text-xl">
      <Link
        to="/findFriend"
        className=" bg-slate-400 p-2 rounded-md bg-opacity-10"
      >
        <i>
          <FaUserPlus />
        </i>
      </Link>
      <Link to="/friend" className=" bg-slate-400 p-2 rounded-md bg-opacity-10">
        <i>
          <FaUser />
        </i>
      </Link>
      <Link
        to="/conversations"
        className=" bg-slate-400 p-2 rounded-md bg-opacity-10"
      >
        <i>
          <BiChat />
        </i>
      </Link>
    </div>
  );
};

export default BottomNav;

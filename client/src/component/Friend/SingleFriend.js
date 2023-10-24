import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fakeUser from '../../assets/images/user.png';

const SingleFriend = ({ item }) => {
  const { id } = useSelector((state) => state.auth.user);
  const { recipient, requester } = item;
  const [friend, setFriend] = useState(
    recipient._id === id ? requester : recipient
  );
  //
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/conversation/${id}`);
  };
  return (
    <div
      className=" bg-slate-900 bg-opacity-20 rounded-md p-2 cursor-pointer"
      onClick={() => handleClick(friend._id)}
    >
      <div className=" flex flex-row gap-3 items-center">
        <img
          className=" rounded-full w-14 h-14 overflow-hidden"
          src={fakeUser}
          alt=""
        />
        <div className=" space-y-2">
          <h1 className="text-xl font-semibold text-white">{friend.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default SingleFriend;

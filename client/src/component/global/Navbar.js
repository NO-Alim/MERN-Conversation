import React from 'react';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../features/auth/authApi';

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const { name = 'Mr Alim' } = auth?.user || {};
  const [
    logout,
    { data: logoutData, isLoading: logoutLoading, error: responseError },
  ] = useLogoutMutation();

  const handleLoggedOut = () => {
    logout();
  };
  return (
    <div className="px-10 sm:px-24 bg-slate-900 min-h-[60px] flex items-center justify-between border-b border-teal-500">
      <div className=" flex-1 flex justify-between">
        <h3 className="text-xl sm:text-2xl text-teal-500 font-bold">{name}</h3>
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-md sm:text-lg"
          onClick={handleLoggedOut}
          disabled={logoutLoading}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

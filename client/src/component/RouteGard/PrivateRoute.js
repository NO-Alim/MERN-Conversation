import { useWindowWidth } from '@react-hook/window-size';
import { Navigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { useBasePath } from '../../Hooks/useBasePath';
import ConversationList from '../../pages/ConversationList';
import BottomNav from '../global/BottomNav';
import Navbar from '../global/Navbar';
const PrivateRoute = ({ children }) => {
  const width = useWindowWidth();

  const basePath = useBasePath();
  const isLoggedIn = useAuth();

  return isLoggedIn ? (
    <div className=" h-[100vh] flex flex-col justify-between">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row">
        <div className=" flex flex-1 flex-col md:max-w-[400px]">
          {basePath === '/conversation' ? (
            <div className=" bg-teal-500 flex-1 md:order-2">
              <div className="hidden md:block p-2">
                <ConversationList />
              </div>
              <div className={`md:hidden h-full`}>
                {/* here display is conditionally none but useEffect run inside children, thats is conditionally render the children*/}
                {/* for useEffect run both(bottom comment children) conversation will create twice for a user  */}
                {width > 767 ? null : children}
              </div>
            </div>
          ) : (
            <div className=" bg-teal-500 flex-1 md:order-2">{children}</div>
          )}
          <div className="">
            <BottomNav />
          </div>
        </div>
        <div className="hidden md:flex md:justify-center md:items-center flex-auto bg-teal-500 border-l border-slate-900">
          {basePath === '/conversation' ? (
            <div className=" w-full h-full">
              {/* here display is conditionally none but useEffect run inside children, thats is conditionally render the children*/}
              {/* for useEffect run both(upper comment children) conversation will create twice for a user  */}

              {width < 768 ? null : children}
            </div>
          ) : (
            <h1 className="text-2xl text-white font-semibold">
              Select a Conversation
            </h1>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

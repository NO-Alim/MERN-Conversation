import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import useAuthCheck from './Hooks/useAuthCheck';
import PrivateRoute from './component/RouteGard/PrivateRoute';
import PublicRoute from './component/RouteGard/PublicRoute';
import Conversation from './pages/Conversation';
import ConversationList from './pages/ConversationList';
import FindFriends from './pages/FindFriends';
import Friend from './pages/Friend';
import Login from './pages/Login';
import Register from './pages/Register';
import LoadingSpin from './ui/LoadingSpin';

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div className="App flex justify-center items-center h-[100vh] overflow-hidden">
      <LoadingSpin />
    </div>
  ) : (
    <div className="App flex flex-col justify-between h-[100vh] overflow-hidden">
      <Router>
        <Routes>
          <Route
            index
            path="/"
            element={
              <PrivateRoute>
                <ConversationList />
              </PrivateRoute>
            }
          />
          <Route
            path="/conversations"
            element={
              <PrivateRoute>
                <ConversationList />
              </PrivateRoute>
            }
          />
          <Route
            path="/conversation/:id"
            element={
              <PrivateRoute>
                <Conversation />
              </PrivateRoute>
            }
          />
          <Route
            path="/friend"
            element={
              <PrivateRoute>
                <Friend />
              </PrivateRoute>
            }
          />
          <Route
            path="/findFriend"
            element={
              <PrivateRoute>
                <FindFriends />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

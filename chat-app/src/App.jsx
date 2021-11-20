import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import ChatPage from './pages/Chat';
import RequireAuth from './containers/RequireAuth';
import { AuthProvider } from './containers/PrivateContainer';
import SignUpPage from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route
            path='/chat'
            element={
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

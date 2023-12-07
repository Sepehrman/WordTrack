import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Routes from react-router-dom
import logo from "./logo.svg";

import Navbar from "./common/Navbar";
import Profile from "./profile/Profile";
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPass from "./auth/ForgotPass";
import ResetMessage from "./components/ResetMessage";


import Dashboard from './landing/Dashboard';

function App() {
  const [userEmail, setUserEmail] = useState(
    sessionStorage.getItem("userEmail")
  );

  useEffect(() => {
    setUserEmail(sessionStorage.getItem("userEmail"));
  }, []);

  return (
    <BrowserRouter>
      <Navbar userEmail={userEmail} setUserEmail={setUserEmail} />
      <Routes>
        <Route path="/" element={<Dashboard userEmail={userEmail}/>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/resetmessage" element={<ResetMessage />} />
        <Route path="/profile" element={
          <PrivateRoute userEmail={userEmail}>
          <Profile />
        </PrivateRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

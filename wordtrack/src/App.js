import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Routes from react-router-dom
import logo from "./logo.svg";

import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from "./components/PrivateRoute";
import ForgotPass from "./components/ForgotPass";
import ResetMessage from "./components/ResetMessage";


import Dashboard from './components/Dashboard';

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

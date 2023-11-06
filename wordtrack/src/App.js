import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes from react-router-dom
import logo from "./logo.svg";

import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Login from './components/Login';
import SignUp from './components/SignUp';

import Dashboard from './components/Dashboard';



function App() {
  return (
    <BrowserRouter>
      <Layout/>
      <Routes>
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add routes for the dashboard or user profile */}
      </Routes>
    </BrowserRouter>
);
}

export default App;

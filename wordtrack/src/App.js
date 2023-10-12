import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes from react-router-dom
import logo from "./logo.svg";

import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FindDefinition from './defpage/FindDefinition';


function App() {
  return (
    <BrowserRouter>
      <Layout/>
      <Routes>
        <Route path="/register" element={<Signup />} /> 
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/definition" element={<FindDefinition/>} />
        <Route path="/profile" element={<Profile />} />
        {/* Add routes for the dashboard or user profile */}
      </Routes>
    </BrowserRouter>
);
}

export default App;

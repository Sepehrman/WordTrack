import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes from react-router-dom

import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} /> 
        <Route path="/login" element={<Login />} />
        {/* Add routes for the dashboard or user profile */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

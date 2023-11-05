import React, { useState, useEffect } from 'react';
import FindDefinition from '../defpage/FindDefinition';
import './Dashboard.css'; // Import the CSS file

function Dashboard({userEmail}) {
  // const userEmail = sessionStorage.getItem('userEmail');

  return (
    <div className="dashboard-container">
      <h2>{userEmail ? `Logged in as ${userEmail}` : 'No user found'}</h2>
      <FindDefinition />
    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from "react";
import FindDefinition from "../defpage/FindDefinition";
import WordOfTheDay from "./WordOfTheDay";
import "./Dashboard.css"; // Import the CSS file

function Dashboard({ userEmail }) {
  return (
    <div className="dashboard-container">
      <h2>{userEmail ? `Logged in as ${userEmail}` : "No user found"}</h2>
      <WordOfTheDay />
      <FindDefinition />
    </div>
  );
}

export default Dashboard;

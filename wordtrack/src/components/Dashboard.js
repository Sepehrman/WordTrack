import React, { useState, useEffect } from "react";
import FindDefinition from "../defpage/FindDefinition";
import WordOfTheDay from "./WordOfTheDay";
import "./Dashboard.css"; // Import the CSS file

function Dashboard({ userEmail }) {
  return (
    <>
      <h2 className="h2-logged-in-as">{userEmail ? `Logged in as ${userEmail}` : "No user found"}</h2>
      <div className="dashboard-container">
        <WordOfTheDay />
        <FindDefinition />
      </div>
    </>
  );
}

export default Dashboard;

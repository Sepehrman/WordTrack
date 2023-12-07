import React from "react";
import FindDefinition from "../dictionary/FindDefinition";
import WordOfTheDay from "./WordOfTheDay";
import "./Dashboard.css"; // Import the CSS file

function Dashboard({ userEmail }) {
  return (
    <>
      <div className="header">
        <h1>Wordtrack</h1>
      </div>
      <div className="dashboard-container">
        <WordOfTheDay />
        <FindDefinition />
      </div>
    </>
  );
}

export default Dashboard;

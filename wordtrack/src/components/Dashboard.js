import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../firebase';
import ListView from './ListView';
import FindDefinition from '../defpage/FindDefinition';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
  const userEmail = sessionStorage.getItem('userEmail');

  const handleAddData = (word) => {
    if (userEmail) {
      const dataRef = ref(database, `data/${userEmail.replace('.', '_')}/${word}`);
      const jsonData = {
        word: word,
        note: '',
      };

      set(dataRef, jsonData)
        .then(() => {
          console.log('Data added to the database: ' + word);
        })
        .catch((error) => {
          console.error('Error adding data: ' + error.message);
        });
    } else {
      console.log('No user found!');
    }
  }

  return (
    <div className="dashboard-container">
      <FindDefinition onAddData={handleAddData} />
    </div>
  );
}

export default Dashboard;

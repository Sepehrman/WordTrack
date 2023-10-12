import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../firebase';

function Dashboard() {
  const [word, setWord] = useState('');
  const [data, setData] = useState('');
  const userEmail = sessionStorage.getItem('userEmail');


  const handleAddData = () => {
    // Ensure a custom key is provided

    // Create a reference to the database location where you want to add the data
    const dataRef = ref(database, `data/${userEmail.replace('.', '_')}/${word}`);
    const jsonData = {
      'word' : word,
      'note' : ''
    }


    // Set the data with the custom key
    set(dataRef, jsonData)
      .then(() => {
        console.log('Data added to the database with custom key: ' + word);
        setWord("");
      })
      .catch((error) => {
        console.error('Error adding data: ' + error.message);
      });
  };

  return (
    <div>
      <h2>Add word to database</h2>
      <div>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </div>
      <button onClick={handleAddData}>Add Data</button>
    </div>
  );
}

export default Dashboard;

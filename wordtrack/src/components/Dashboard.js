import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../firebase'; 

function Dashboard() {
  const [data, setData] = useState('');
  const dataRef = ref(database, 'data');


  const handleSubmit = (e) => {
    e.preventDefault();
    const userEmail = sessionStorage.getItem('userEmail');

    // Push data to the 'data' location in the database
    push(dataRef, data)
      .then(() => {
        console.log(`User ${userEmail} added stuff to the database`);
        setData(''); // Clear the input field after adding data
      })
      .catch((error) => {
        console.error('Error adding data: ' + error.message);
      });
  };

  return (
    <div>
      <h2>Save Word to database</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit">Add Data</button>
      </form>
    </div>
  );
}

export default Dashboard;
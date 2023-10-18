import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../firebase';

function AddData() {
  const [word, setWord] = useState('');
  const userEmail = sessionStorage.getItem('userEmail');

  const handleAddData = () => {
    if (userEmail) {
      const dataRef = ref(database, `data/${userEmail.replace('.', '_')}/${word}`);
      const jsonData = {
        word: word,
        note: '',
      };

      set(dataRef, jsonData)
        .then(() => {
          console.log('Data added to the database: ' + word);
          setWord('');
        })
        .catch((error) => {
          console.error('Error adding data: ' + error.message);
        });
    } else {
      console.log('No user found!');
    }
  };

  return (
    <div className="add-data-container"> {/* Apply the "add-data-container" class */}
      <h2>Add word to database</h2>
      <div>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Type a word..."
        />
      </div>
      <button onClick={handleAddData}>Add Data</button>
    </div>
  );
}

export default AddData;

import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../firebase';

const styles = {
  container: {
    width: "100%",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    fontSize: "18px",
  },
  textareaContainer: {
    width: "100%",
  },
  noteBtn: {
    marginTop: "20px",
  },
}

function AddWordWithNote({ word }) {
  const [note, setNote] = useState('');
  const userEmail = sessionStorage.getItem('userEmail');

  // Handles adding the note to the specific word in the database
  const handleAddData = () => {
    if (userEmail) {
      const dataRef = ref(database, `data/${userEmail.replace('.', '_')}/words/${word}`);
      const jsonData = {
        note: note,
      };

      set(dataRef, jsonData)
        .then(() => {
          console.log('Note added to the database for word: ' + word);
          setNote('');
        })
        .catch((error) => {
          console.error('Error adding note: ' + error.message);
        });
    } else {
      console.log('Please enter both word and note.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add note to a word in the database</h2>
      <div styles={styles.textareaContainer}>
        <textarea
          style={styles.textarea}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your notes here..."
          rows="6"
          cols="50"
        />
      </div>
      <button style={styles.noteBtn} onClick={handleAddData}>Add Note</button>
    </div>
  );
}

export default AddWordWithNote;

import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../firebase';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
}

function AddWordWithNote({ word }) {
  const [note, setNote] = useState('');
  const userEmail = sessionStorage.getItem('userEmail');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate(); 

  // Handles adding the note to the specific word in the database
  const handleAddData = () => {
    if (!userEmail) {
      // Redirect to the login page if userEmail is null
      navigate('/login');
      return;
    }
    if (userEmail) {
      
      const dataRef = ref(database, `data/${userEmail.replace('.', '_')}/words/${word}`);
      const jsonData = {
        note: note,
      };

      set(dataRef, jsonData)
        .then(() => {
          console.log('Note added to the database for word: ' + word);
          setShowConfirmation(true);
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
     <h2>Add a Note:</h2>
      <div styles={styles.textareaContainer}>
        <textarea
          style={styles.textarea}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Save a note with your word: ..."
          rows="2"
          cols="50"
          data-cy="definition-note-textarea"
        />
      </div>
      <button style={styles.noteBtn} data-cy="btn-save-word" onClick={handleAddData}>Save Word</button>
      {showConfirmation && (
        <p style={styles.confirmation}>Word successfully added!</p>
      )}
    </div>
  );
}

AddWordWithNote.propTypes = {
  word: PropTypes.string.isRequired,
};

export default AddWordWithNote;

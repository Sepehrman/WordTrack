import React, { useState } from 'react';

const Note = () => {
  const [note, setNote] = useState('');  // For holding the current note
 

  // Handles the change in textarea
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };



  return (
    <div>
      <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Save a note with your word here: ..."
        rows="2"
        cols="40"
        data-cy="definition-note-textarea"
      />
    </div>

  );
};

export default Note;

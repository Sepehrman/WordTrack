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
        placeholder="Write your notes here..."
        rows="6"
        cols="50"
      />
    </div>

  );
};

export default Note;

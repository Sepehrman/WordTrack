import React from "react";

const NoteSection = ({ note, editingNote, setNote, handleSaveNote, handleEditNote }) => (
  <div>
    <h2>Note:</h2>
    {editingNote ? (
      <>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows="2" />
        <button onClick={handleSaveNote}>Save Note</button>
      </>
    ) : (
      <>
        <p>{note}</p>
        <button onClick={handleEditNote}>Edit Note</button>
      </>
    )}
  </div>
);

export default NoteSection;

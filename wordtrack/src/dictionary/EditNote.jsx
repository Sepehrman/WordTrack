import React from "react";
import "./EditNote.css";

const NoteSection = ({ note, editingNote, setNote, handleSaveNote, handleEditNote }) => (
  <div className="note-section">
    <h2>Note:</h2>
    {editingNote ? (
      <>
        <textarea className="note-textarea" value={note} onChange={(e) => setNote(e.target.value)} rows="2" />
        <button className="save-note-button" onClick={handleSaveNote}>
          Save Note
        </button>
      </>
    ) : (
      <>
        <p className="note-text">{note}</p>
        <button className="edit-note-button" onClick={handleEditNote}>
          Edit Note
        </button>
      </>
    )}
  </div>
);

export default NoteSection;

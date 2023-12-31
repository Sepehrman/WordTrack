// utils/hooks/useFirebase.js
import { useState, useEffect } from "react";
import { ref, get, set } from "firebase/database";
import { database } from "../firebase";

export const useFirebase = (userEmail, lookupWord) => {
  const [note, setNote] = useState("");
  const [editingNote, setEditingNote] = useState(false);

  // Define handleGetNote here
  const handleGetNote = async () => {
    if (userEmail) {
      const noteRef = ref(database, `data/${userEmail}/words/${lookupWord}/note`);
      try {
        const snapshot = await get(noteRef);
        if (snapshot.exists()) {
          setNote(snapshot.val());
        } else {
          setNote("No note found for this word.");
        }
      } catch (error) {
        console.error("Error fetching note: ", error);
        setNote("Error fetching note.");
      }
    }
  };

  useEffect(() => {
    handleGetNote(); // Now it's defined and can be used here
  }, [userEmail, lookupWord]);

  const handleSaveNote = () => {
    if (userEmail) {
      const noteRef = ref(database, `data/${userEmail}/words/${lookupWord}/note`);
      set(noteRef, note)
        .then(() => setEditingNote(false))
        .catch((error) => {
          console.error("Error saving note: ", error);
          setEditingNote(false);
        });
    }
  };

  return { note, setNote, editingNote, setEditingNote, handleSaveNote, handleGetNote };
};

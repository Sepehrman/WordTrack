import React, { useState, useEffect } from "react";
import SingleWordMeaning from "./SingleWordMeaning";
import Audio from "../common/Audio";
import { ref, get, set } from "firebase/database";
import { database } from "../firebase";
import NoteSection from "./EditNote";
import "./WordDef.css";

const WordDefinition = ({ lookupWord }) => {
  if (typeof lookupWord !== "string" || lookupWord === "") {
    console.log(lookupWord);
    console.log(
      "Error: 'lookupWord' prop to 'WordDef' component is either not of type string or it is an empty string"
    );
    lookupWord = "";
  }

  const [word, setWord] = useState(lookupWord);
  const [note, setNote] = useState("");
  const [editingNote, setEditingNote] = useState(false);
  const userEmail = sessionStorage.getItem("userEmail")?.replace(/\./g, "_") || "";
  const [isLoading, setIsLoading] = useState(true);
  const [definition, setDefinition] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setWord(lookupWord);
    handleGetNote();
  }, [lookupWord]);

  useEffect(() => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not find word definition");
        }
        return response.json();
      })
      .then((data) => {
        setDefinition(data[0]);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [word]);

  const handleEditNote = () => {
    setEditingNote(true);
  };

  const handleSaveNote = () => {
    if (userEmail) {
      const noteRef = ref(database, `data/${userEmail.replace('.', '_')}/words/${lookupWord}/note`);
      set(noteRef, note)
        .then(() => {
          setEditingNote(false);
        })
        .catch((error) => {
          console.error("Error saving note: ", error);
          setEditingNote(false);
        });
    }
  };

  const handleGetNote = () => {
    if (userEmail) {
      const noteRef = ref(database, `data/${userEmail.replace('.', '_')}/words/${lookupWord}/note`);
      get(noteRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setNote(snapshot.val());
          } else {
            setNote("No note found for this word.");
          }
        })
        .catch((error) => {
          console.error("Error fetching note: ", error);
          setNote("Error fetching note.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="worddef-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error occurred: {error}</p>
      ) : (
        <div>
          <h1 data-cy="h1-def">Definition: {definition.word}</h1>
          <div className="scrollable-box">
            {definition.meanings &&
              definition.meanings.map((meaningEntry, index) => (
                <React.Fragment key={index + 1}>
                  <div>
                    <Audio
                      audioUrlSrc={definition.phonetics[index]?.audio}
                      pronunciationText={definition.phonetics[index]?.text}
                    />
                    <SingleWordMeaning meaningEntry={meaningEntry} />
                  </div>
                </React.Fragment>
              ))}
          </div>
          <NoteSection
            note={note}
            editingNote={editingNote}
            setNote={setNote}
            handleSaveNote={handleSaveNote}
            handleEditNote={handleEditNote}
          />
        </div>
      )}
    </div>
  );
};

export default WordDefinition;

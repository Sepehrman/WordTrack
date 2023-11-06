import React, { useState, useEffect } from "react";
import SingleWordMeaning from "./SingleWordMeaning";
import Audio from "./Audio";
import { ref, get, set } from "firebase/database";
import { database } from "../firebase";
import "./WordDef.css"; // Import the CSS file

const Definition = ({ lookupWord }) => {
  if (typeof lookupWord !== "string" || lookupWord === "") {
    console.log(lookupWord);
    console.log(
      "Error: 'lookupWord' prop to 'WordDef' component is either not of type string or it is an empty string"
    );
    lookupWord = "";
  }
  // State to hold the word to look up
  const [word, setWord] = useState(lookupWord);
  const [note, setNote] = useState("");
  const [editingNote, setEditingNote] = useState(false);
  const userEmail = sessionStorage.getItem("userEmail")?.replace(/\./g, "_") || "";

  // State to handle loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      setError(null);
      console.log(typeof lookupWord);
      setWord(lookupWord);
      handleGetNote(); // Fetch the note when lookupWord changes
    },
    [lookupWord]
  );

  // State to hold the fetched definition
  const [definition, setDefinition] = useState({});

  // State to handle error
  const [error, setError] = useState(null);

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

  // Fetch the note function
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
          setIsLoading(false); // Update the loading state when the note is fetched
        });
    }
  };

  useEffect(() => {
    // The URL for the API endpoint, with the word inserted into the string
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    // Fetch data from the API
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not ok " + response.statusText);
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
        setIsLoading(false); // Update the loading state when the definition is fetched
      });
  }, [word]); // Re-run the effect when the 'word' state changes

  let idCounter = 1;

  return (
    <div className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error occurred: {error}</p>
      ) : (
        <div>
          <h1>Definition: {definition.word}</h1>
          <div className="scrollable-box">
            {definition.meanings
              ? definition.meanings.map((x, index) => (
                  <React.Fragment key={idCounter++}>
                    <div>
                      <Audio
                        audioUrlSrc={definition.phonetics[index]?.audio}
                        pronunciationText={definition.phonetics[index]?.text}
                      />
                      <SingleWordMeaning meaningEntry={x} />
                    </div>
                  </React.Fragment>
                ))
              : undefined}
          </div>
          <div className="note">
            <h2>Note:</h2>
            {editingNote ? (
              <>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows="4"
                />
                <button onClick={handleSaveNote}>Save Note</button>
              </>
            ) : (
              <>
                <p>{note}</p>
                <button onClick={handleEditNote}>Edit Note</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Definition;

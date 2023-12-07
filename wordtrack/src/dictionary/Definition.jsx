// components/pages/WordDefinition.jsx
import React, { useState, useEffect } from "react";
import { useApi } from "../hooks/useAPI";
import { useFirebase } from "../hooks/useFirebase";
import SingleWordMeaning from "./SingleWordMeaning";
import Audio from "../common/Audio";
import NoteSection from "./EditNote";

const WordDefinition = ({ lookupWord }) => {
  if (typeof lookupWord !== "string" || lookupWord === "") {
    console.log(lookupWord);
    console.log(
      "Error: 'lookupWord' prop to 'WordDef' component is either not of type string or it is an empty string"
    );
    lookupWord = "";
  }

  const [word, setWord] = useState(lookupWord);
  const userEmail =
    sessionStorage.getItem("userEmail")?.replace(/\./g, "_") || "";

  const { data: definition, isLoading, error } = useApi(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const {
    note,
    setNote,
    editingNote,
    setEditingNote, 
    handleSaveNote,
    handleGetNote,
  } = useFirebase(userEmail, lookupWord);

  useEffect(() => {
    setWord(lookupWord);
  }, [lookupWord]);

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
          <div className="worddef-footer">
            <NoteSection
              note={note}
              editingNote={editingNote}
              setNote={setNote}
              handleSaveNote={handleSaveNote}
              handleEditNote={() => setEditingNote(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WordDefinition;

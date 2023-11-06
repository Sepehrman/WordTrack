import React, { useState, useEffect } from "react";
import SingleWordMeaning from "./SingleWordMeaning";
import Audio from "./Audio";
import AddWordWithNote from "../components/AddWord";
import "./WordDef.css"; // Import the CSS file

const WordDef = ({ lookupWord}) => {
  if (typeof lookupWord !== "string" || lookupWord === "") {
    console.log(lookupWord);
    console.log(
      "Error: 'lookupWord' prop to 'WordDef' component is either not of type string or it is an empty string"
    );
    lookupWord = "";
  }
  // State to hold the word to look up
  const [word, setWord] = useState(lookupWord); // Initially set to 'example', can be changed as per the requirement

  useEffect(
    function () {
      setError(null);
      setWord(lookupWord);
    },
    [lookupWord]
  );

  // State to hold the fetched definition
  const [definition, setDefinition] = useState({});

  // State to handle loading
  const [isLoading, setIsLoading] = useState(true);

  // State to handle error
  const [error, setError] = useState(null);

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
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
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
          <div className="footer">
            <AddWordWithNote word={word} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WordDef;

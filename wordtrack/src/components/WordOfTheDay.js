import React, { useEffect, useState } from "react";
var words = require("an-array-of-english-words");
var seedrandom = require("seedrandom");

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "70vw",
    minHeight: "180px",
    alignItems: "center",
  },
  underline: {
    textDecoration: "underline",
  },
};

const WordOfTheDay = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState(undefined);
  const [definition, setDefinition] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    var daysSinceEpochTime = getDaysSinceEpochTime();
    var wordOfTheDay = getWordOfTheDayBasedOnSeededRandom(daysSinceEpochTime); // Random Index from seed
    setWordOfTheDay(wordOfTheDay);
    getDefinitionOfWord(wordOfTheDay);
  }, []);

  const getDaysSinceEpochTime = () => {
    var currentDate, epochDate;
    currentDate = new Date();
    var epochDate = new Date(new Date().getTime() / 1000);
    var res = Math.abs(currentDate - epochDate) / 1000;

    // get total days between two dates
    var difference = Math.floor(res / 86400);
    return difference;
  };

  const getWordOfTheDayBasedOnSeededRandom = (seed) => {
    var rng = seedrandom(seed); // Set Seed for random
    var rand = rng();

    // Get index in array
    var index = Math.floor(words.length * rand);
    var wordOfTheDay = words[index];
    return wordOfTheDay;
  };

  const getDefinitionOfWord = async (word) => {
    // The URL for the API endpoint, with the word inserted into the string
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    // Fetch data from the API
    fetch(url)
      .then((response) => {
        // If word definition does not exist, used word to seed next random word and get definition
        if (response.status === 404) {
          var newWordOfTheDay = getWordOfTheDayBasedOnSeededRandom(word);
          setWordOfTheDay(newWordOfTheDay);
          return getDefinitionOfWord(newWordOfTheDay);
        }
        if (!response.ok) {
          console.log("Network response was not ok " + response.statusText);
          throw new Error("Could not find word definition");
        }
        return response.json();
      })
      .then((data) => {
        setDefinition(data[0].meanings[0].definitions[0].definition);   // Use First Definition
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div style={styles.container}>
        {definition ? (
          <>
            <h1>
              Today's word is <a style={styles.underline}>{wordOfTheDay}</a>
            </h1>
            <h3>"{definition ? definition : error}"</h3>
          </>
        ) : undefined}
      </div>
    </div>
  );
};

export default WordOfTheDay;

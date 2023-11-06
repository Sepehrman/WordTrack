import React, { useEffect, useState } from "react";
var words = require("an-array-of-english-words");
var seedrandom = require("seedrandom");

const styles = {
  container: {
    // display: "flex",
    // height: 60,
    backgroundColor: "red",
    maxWidth: "70vw",
    alignItems: "center",
  },
};

const WordOfTheDay = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState(undefined);
  const [definition, setDefinition] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    var daysSinceEpochTime = getDaysSinceEpochTime() + 14;
    var wordOfTheDay = getWordOfTheDayBasedOnSeededRandom(daysSinceEpochTime);  // Random Index from seed

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
    console.log(difference);
    return difference;
  };

  const getWordOfTheDayBasedOnSeededRandom = (seed) => {
    var rng = seedrandom(seed);   // Set Seed for random
    var rand = rng();

    // Get index in array
    var index = Math.floor(words.length * rand);
    var wordOfTheDay = words[index];
    return wordOfTheDay;
  }

  const getDefinitionOfWord = async (word) => {
    // The URL for the API endpoint, with the word inserted into the string
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    // Fetch data from the API
    fetch(url)
      .then((response) => {
        console.log("Response: ", response);
        
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
        setDefinition(data[0].meanings[0].definitions[0].definition);
        console.log(data[0].meanings[0].definitions[0].definition);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

  return (
    <div>
      {definition ? (
        <div style={styles.container}>
          <h1>Word of the Day: {wordOfTheDay}</h1>
          <h3>{definition ? definition : error}</h3>
        </div>
      ) : undefined}
    </div>
  );
};

export default WordOfTheDay;

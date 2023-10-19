import React, { useState } from 'react';
import WordDef from './WordDef';
import './FindDefinition.css';
var words = require('an-array-of-english-words');

function FindDefinition() {
  const [inputValue, setInputValue] = useState('');
  const [lookupWord, setLookupWord] = useState('');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredSuggestions = words.filter((word) =>
      word.toLowerCase().includes(value.toLowerCase())
    );

    setAutocompleteSuggestions(filteredSuggestions.slice(0, 5));
  };

  const handleButtonClick = () => {
    setLookupWord(inputValue);
  };

  const handleAddData = (word) => {
    console.log(`Adding ${word} to the database...`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
      document.getElementById('autocomplete-input').blur();
    }
  };

  return (
    <div className="find-definition-container">
      <div className="header">
        <h1>Wordtrack</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          list="autocomplete-suggestions"
          placeholder="Type something..."
          className="autocomplete-input"
          id="autocomplete-input"
          onKeyDown={handleKeyDown} // Handle Enter key press
        />
        <datalist id="autocomplete-suggestions">
          {autocompleteSuggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
        <button onClick={handleButtonClick} className="search-button">
          Lookup Definition
        </button>
      </div>
      <div className="word-def-container">
        {lookupWord && (
          <WordDef
            lookupWord={lookupWord}
            onAddData={handleAddData}
          />
        )}
      </div>
    </div>
  );
}

export default FindDefinition;

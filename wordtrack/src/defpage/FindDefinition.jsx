import React, { useState } from 'react';
import WordDef from './WordDef';
import './FindDefinition.css'; // Import the CSS file

function FindDefinition() {
  const [inputValue, setInputValue] = useState('');
  const [lookupWord, setLookupWord] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setLookupWord(inputValue);
  };

  return (
    <div className="find-definition-container">
        <div className='header'>
        <h1>Wordtrack</h1>
        </div>
      <div className="search-bar">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
        <button onClick={handleButtonClick}>Lookup Definition</button>
      </div>
      <div className="word-def-container">
        {lookupWord && (
          <WordDef lookupWord={lookupWord} />
        )}
      </div>
    </div>
  );
}

export default FindDefinition;

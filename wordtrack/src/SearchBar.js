import React, { useState } from 'react';
import { getWordDefinition } from './API';

function SearchBar() {
    const [word, setWord] = useState('');
    const [definitions, setDefinitions] = useState([]);

    const handleSearch = async () => {
        const newDefinitions = await getWordDefinition(word);
        setDefinitions(newDefinitions);
    };

    return (
        <div>
            <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {definitions.map((definition, index) => (
                    <li key={index}>{definition}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;

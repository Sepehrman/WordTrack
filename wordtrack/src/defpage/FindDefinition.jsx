// import React, { useState, useEffect  } from 'react';
// import WordDef from './Components/WordDef'
// function App() {
//     const [inputValue, setInputValue] = useState(''); 
//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//       };
//       useEffect(() => {
//         console.log('Input changed:', inputValue);
//       }, [inputValue]);
//     return (
//         <>

//         <div>
//         <input 
//         type="text" 
//         value={inputValue} 
//         onChange={handleInputChange} 
//         placeholder="Type something..."
//       />
//         <WordDef lookupWord={inputValue}/>
//         </div>
    
//         </>
//     );
// }

// export default App;


import React, { useState } from 'react';
import WordDef from './WordDef';

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
        <div>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Type something..."
                data-cy="input-text-definition"
            />
            <button onClick={handleButtonClick}>Lookup Definition</button>
            {lookupWord && <WordDef lookupWord={lookupWord} />}
        </div>
    );
}

export default FindDefinition;



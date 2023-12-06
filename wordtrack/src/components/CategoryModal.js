import React, { useEffect, useState } from 'react';
import WordButtonCategory from './WordButtonCategory';
import { database } from '../firebase';
import { ref, onValue, off, remove, child } from 'firebase/database';
import './CategoryModal.css';
import Definition from '../defpage/Definition';

const CategoryModal = ({ category, onClose }) => {
  const [words, setWords] = useState([]);
  const [definitionComponents, setDefinitionComponents] = useState([]);
  const [currentCueCardIndex, setCurrentCueCardIndex] = useState(0);
  const [showCueCards, setShowCueCards] = useState(false);
  const [isCueCardBlurred, setIsCueCardBlurred] = useState(false);
  const userEmail = sessionStorage.getItem('userEmail')?.replace(/\./g, '_') || '';
  const toggleCueCardBlur = () => {
    setIsCueCardBlurred(!isCueCardBlurred);
  };

  const handleDeleteWord = (category, word) => {
    const userCategoryRef = ref(database, `data/${userEmail}/categories/${category}`);
    remove(child(userCategoryRef, word))
      .then(() => {
        console.log('Deleted word from category');
      })
      .catch((error) => {
        console.error('Error deleting word from category: ' + error.message);
      });
  };

  useEffect(() => {
    const categoryRef = ref(database, `data/${userEmail}/categories/${category}`);
    onValue(categoryRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const wordList = Object.keys(data);
        setWords(wordList);

        // Create an array of Definition components
        const definitionComponents = wordList.map((word, index) => (
          <Definition key={index} lookupWord={word} />
        ));
        setDefinitionComponents(definitionComponents);
      } else {
        console.log('empty');
        setWords([]);
        setDefinitionComponents([]); // Clear definition components if no words
      }
    });

    

    return () => {
      off(categoryRef);
    };
  }, [userEmail, category]);

  const toggleCueCards = () => {
    setShowCueCards(!showCueCards);
  };

  const navigateCueCards = (step) => {
    const newIndex = currentCueCardIndex + step;
    if (newIndex >= 0 && newIndex < definitionComponents.length) {
      setCurrentCueCardIndex(newIndex);
    }
  };

  return (
    <div className="category-modal">
      <div className="word-list">
        {words.map((word, index) => (
          <WordButtonCategory
            word={word}
            key={index}
            onDelete={() => handleDeleteWord(category, word)}
          />
        ))}
      </div>
      <div className='button-set-category-dropdown'>
      <button className="cue-cards-button" onClick={toggleCueCards}>
        Cue Cards
      </button>
      <button className="close-modal" onClick={onClose}>
        Close
      </button>
      </div>
      {showCueCards && (
        <div className="cue-cards">
          <button className="close-cue-cards" onClick={toggleCueCards}>
            Close Cue Cards
          </button>
          <button onClick={() => navigateCueCards(-1)}>Previous</button>
          <button onClick={() => navigateCueCards(1)}>Next</button>

          <h2> Word : {words[currentCueCardIndex]}</h2>

          <div className={"cue-card " + (isCueCardBlurred ? "blur" : "")} onClick={toggleCueCardBlur}>
          {definitionComponents[currentCueCardIndex]}
        </div>
        </div>
      )}
    </div>
  );
};

export default CategoryModal;

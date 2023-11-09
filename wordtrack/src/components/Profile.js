import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue, remove, set } from "firebase/database";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Definition from '../defpage/Definition';
import WordButton from './WordButton';
import CategoryButton from './CategoryButton';
import './Profile.css';

const Profile = () => {
  const [categories, setCategories] = useState([]);
  const [reviewWords, setReviewWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showWordDef, setShowWordDef] = useState(false);
  const userEmail = sessionStorage.getItem("userEmail")?.replace(/\./g, "_") || "";

  useEffect(() => {
    const userWordsRef = ref(database, `data/${userEmail}/words`);
    const userCategoryRef = ref(database, `data/${userEmail}/categories`);

    onValue(userWordsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const words = Object.keys(data);
        setReviewWords(words);
      } else {
        console.log("No user words found in the database.");
      }
    });

    onValue(userCategoryRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const categories = Object.keys(data);
        setCategories(categories);
      } else {
        console.log("No user categories found in the database.");
      }
    });

  }, [userEmail]);

  const handleChange = (search) => {
    setSearchValue(search);
    // Filter through choices
  };

  const handleCloseWordDef = () => {
    setShowWordDef(false);
  };

  const openWordDef = () => {
    setShowWordDef(true);
  };

  const handleAddCategory = () => {
    if (newCategory) {
      const userCategoryRef = ref(database, `data/${userEmail}/categories/${newCategory}`);
      set(userCategoryRef, true);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category) => {
    const userCategoryRef = ref(database, `data/${userEmail}/categories/${category}`);
    remove(userCategoryRef);
  };

  const handleDeleteWord = (word) => {
    const userWordRef = ref(database, `data/${userEmail}/${word}`);
    remove(userWordRef);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2 className="myProfileText">My Profile</h2>
        <div className="container">
          <div className="colOne">
            <div className="categories">
              <h3 className="myProfileText">Categories</h3>
              <div>
                <input
                  type="text"
                  placeholder="New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  data-cy="profile-text-bar"
                />
                <button onClick={handleAddCategory} data-cy="category-button">Add Category</button>
              </div>
              <div className="categoriesCardContainer">
                <div className="category-row">
                  {categories.map((category, index) => (
                    <CategoryButton
                      category={category}
                      onDelete={() => handleDeleteCategory(category)}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="colTwo">
            <h2>Saved Words</h2>
            <form>
              <label>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </label>
            </form>
            <div className="reviewWordsContainer">
              {reviewWords.map((word, index) => (
                <WordButton
                  word={word}
                  onDelete={() => handleDeleteWord(word)}
                  onClick={() => {
                    setSelectedWord(word);
                    openWordDef(); // Show the WordDef component
                  }}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
        {showWordDef && (
          <div className={`popup ${showWordDef ? 'open' : ''}`} data-cy="cue-card-def">
            <button className="close-button" onClick={handleCloseWordDef}>
              Close
            </button>
            {selectedWord && <Definition lookupWord={selectedWord} />}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Profile;

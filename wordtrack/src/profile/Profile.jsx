import React, { useEffect, useState } from "react";
import { FirebaseService } from "../firebase";
// import { database } from "../firebase";
import { ref, onValue, remove, set, get } from "firebase/database";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Definition from "../dictionary/Definition";
import WordButton from "./WordButton";
import CategoryButton from "./CategoryButton";
import "./Profile.css";

const Profile = () => {
  const [categories, setCategories] = useState([]);
  const [reviewWords, setReviewWords] = useState([]);
  const [allReviewWords, setAllReviewWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [showWordDef, setShowWordDef] = useState(false);
  const [savedWordsSearch, setSavedWordsSearch] = useState("");

  const userEmail =
    sessionStorage.getItem("userEmail")?.replace(/\./g, "_") || "";

  useEffect(() => {
    const userWordsRef = ref(FirebaseService.getInstance().database, `data/${userEmail}/words`);
    const userCategoryRef = ref(FirebaseService.getInstance().database, `data/${userEmail}/categories`);

    onValue(userWordsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const words = Object.keys(data);
        setReviewWords(words);
        setAllReviewWords(words);
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


  const handleCloseWordDef = () => {
    setShowWordDef(false);
  };

  const openWordDef = () => {
    setShowWordDef(true);
  };

  const filterSavedWords = (input) => {
    setSavedWordsSearch(input);
    if (input.trim() === "") {
      setReviewWords(allReviewWords);
      return;
    }
    const regex = new RegExp(`${input.toLowerCase().trim()}`);
    const filteredAllReviewWords = allReviewWords.filter((word) => regex.test(word.toLowerCase()));
    setReviewWords(filteredAllReviewWords);
  }

  const handleAddCategory = async () => {
    if (newCategory) {
      const userCategoryRef = ref(
        Firebase.getInstance().database,
        `data/${userEmail}/categories/${newCategory}`
      );
  
      try {
        await set(userCategoryRef, true);
        setNewCategory("");
  
        // Update state after successful addition
        setCategories((prevCategories) =>
          prevCategories.includes(newCategory)
            ? prevCategories
            : [...prevCategories, newCategory]
        );
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };
  
const handleDeleteCategory = async (categoryToDelete) => {
  const userCategoryRef = ref(
    Firebase.getInstance().database,
    `data/${userEmail}/categories/${categoryToDelete}`
  );

  try {
    await remove(userCategoryRef);

    // Update state after successful deletion
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryToDelete)
    );

    // Trigger a refresh by re-fetching the categories
    const refreshedCategories = await fetchCategories();
    setCategories(refreshedCategories);
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

// Add a function to fetch categories
const fetchCategories = async () => {
  const userCategoryRef = ref(Firebase.getInstance().database, `data/${userEmail}/categories`);
  const snapshot = await get(userCategoryRef);

  if (snapshot.exists()) {
    const data = snapshot.val();
    const categories = Object.keys(data);
    return categories;
  } else {
    console.log("No user categories found in the database.");
    return [];
  }
};
  
  
const handleDeleteWord = async (wordToDelete) => {
  const userWordRef = ref(Firebase.getInstance().database, `data/${userEmail}/${wordToDelete}`);

  try {
    await remove(userWordRef);

    // Update state after successful deletion
    setReviewWords((prevWords) =>
      prevWords.filter((word) => word !== wordToDelete)
    );
  } catch (error) {
    console.error("Error deleting word:", error);
  }
};



  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2 className="myProfileText">My Profile</h2>
        <div className="container">
          <div className="colOne">
            <div className="categories">
              <h3 className="myProfileText">Categories</h3>
              <div className="add-category">
                <div className="add-category-container">
                  <input
                    type="text"
                    placeholder="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    data-cy="profile-text-bar"
                    className="search-bar"
                  />
                  <button
                    className="add-category-button"
                    onClick={handleAddCategory}
                    data-cy="category-button"
                  >
                    Add Category
                  </button>
                </div>
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
            <input
              type="text"
              placeholder="Search"
              value={savedWordsSearch}
              onChange={(e) => filterSavedWords(e.target.value)}
              className="saved-words-search-bar"
            />
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
          <div
            className={`popup ${showWordDef ? "open" : ""}`}
            data-cy="cue-card-def"
          >
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

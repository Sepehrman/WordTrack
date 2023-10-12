import React from "react";
import { useEffect, useState } from "react";

import ProfileCategoryCard from "./ProfileCategoryCard";

const style = {
  container: {
    width: "100vw",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "row",
  },
  colOne: {
    flexGrow: 2,
    // backgroundColor: "lightblue",
  },
  colTwo: {
    flexGrow: 1,
  },
  myProfileText: {
    textAlign: "start",
    marginLeft: 30,
  },
  categories: {
    border: "2px solid rgba(0, 0, 0, 0.4)",
    height: "100%",
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 0,
  },
  categoriesCardContainer: {
    width: "100%",
    minHeight: 100,
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  reviewWordsContainer: {
    width: "100%",
    minHeight: 100,
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  reviewWordButton: {
    width: "50%",
    height: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
};

const Profile = () => {
  const [categories, setCategories] = useState(["All", "Biology", "Physics"]);
  const [reviewWords, setReviewWords] = useState([
    "Word1",
    "Word1",
    "Word1",
    "Word1",
    "Word1",
    "Word1",
  ]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // API Call here and setCategories and setReviewWords
  }, []);

  const handleChange = (search) => {
    setSearchValue(search);
    // Filter through choices
  };

  const clickWord = (word) => {
    console.log("Clicked: ", word);
  };

  return (
    <div>
      <h2 style={style.myProfileText}>My Profile</h2>
      <div style={style.container}>
        <div style={style.colOne}>
          <div style={style.categories}>
            <h3 style={style.myProfileText}>Categories</h3>
            <div style={style.categoriesCardContainer}>
              {categories.map((category, index) => (
                <ProfileCategoryCard category={category} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div style={style.colTwo}>
          <h2>Categories</h2>
          <form>
            <label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => handleChange(e.target.value)}
              />{" "}
            </label>
          </form>
          <div style={style.reviewWordsContainer}>
            {reviewWords.map((word, index) => (
              <button
                style={style.reviewWordButton}
                onClick={() => clickWord(word)}
                key={index}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

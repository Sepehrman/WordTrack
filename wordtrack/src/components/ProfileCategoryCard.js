import React from "react";

const style = {
  container: {
    height: 200,
    width: 200,
    border: "2px solid rgba(0, 0, 0, 0.4)",
    borderRadius: 5,
    marginBottom: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const ProfileCategoryCard = ({ category }) => {
  return (
    <button style={style.container}>
      <h1>{category}</h1>
    </button>
  );
};

export default ProfileCategoryCard;

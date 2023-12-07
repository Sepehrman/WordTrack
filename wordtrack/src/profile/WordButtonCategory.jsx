import React from 'react';
import "./WordButton.css";

const WordButtonCategory = ({ word, onDelete, onClick }) => {

    return (
        <div className="buttonContainer">
            <button className="reviewWordButton" onClick={onClick}>
                {word}
            </button>
            <button className="deleteWordButton" onClick={onDelete}>X</button>
        </div>
    );
};

export default WordButtonCategory;

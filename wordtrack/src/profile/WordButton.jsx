import React from 'react';
import { ref, remove } from 'firebase/database';
// import { database } from '../firebase';
import { FirebaseService } from "../firebase";

import { useDrag } from 'react-dnd';
import "./WordButton.css";

const WordButton = ({ word, onDelete, onClick }) => {
    const userEmailFromSession = sessionStorage.getItem("userEmail");
    const userEmail = userEmailFromSession ? userEmailFromSession.replace(/\./g, "_") : "";

    const [, drag] = useDrag({
        type: 'WORD', // Define the drag type
        item: { word }, // Data to be passed when the item is dropped
    });

    const handleDelete = () => {
        const userWordsRef = ref(FirebaseService.getInstance().database, `data/${userEmail}/words/${word}`);
        remove(userWordsRef)
            .then(() => {
                onDelete(word); // Notify the parent component to update the state
            })
            .catch((error) => {
                console.error('Error deleting word:', error);
            });
    };

    return (
        <div ref={drag} className="buttonContainer">
            <button className="reviewWordButton" onClick={onClick}  data-cy={"cue-card-button-" + word}>
                {word}
            </button>
            <button className="deleteWordButton" onClick={handleDelete}>X</button>
        </div>
    );
};

export default WordButton;

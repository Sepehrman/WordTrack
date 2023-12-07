import React, { useState } from 'react';
import { ref, set, get, remove } from 'firebase/database';
// import { database } from '../firebase';
import { FirebaseService } from "../firebase";
import { useDrag, useDrop } from 'react-dnd';
import CategoryModal from './CategoryModal'; // Import your CategoryModal component
import "./CategoryButton.css";

const CategoryButton = ({ category, onDelete }) => {
  const userEmail = sessionStorage.getItem('userEmail').replace('.', '_');

  const [editing, setEditing] = useState(false); // State to manage edit mode
  const [updatedCategory, setUpdatedCategory] = useState(category);

  const [showCategoryModal, setShowCategoryModal] = useState(false); // State to manage modal visibility
  const [selectedCategory, setSelectedCategory] = useState(null); // State to store the selected category

  const [, drop] = useDrop({
    accept: 'WORD', // Accept only items of type 'WORD'
    // Handle the drop action here
    drop: async (item) => {
      const userCategoryRef = ref(FirebaseService.getInstance().database, `data/${userEmail.replace('.', '_')}/categories/${category}/`);

      try {
        // Fetch the existing words in the category
        const categorySnapshot = await get(userCategoryRef);
        if (categorySnapshot.exists()) {
          const existingWords = categorySnapshot.val();
          const updatedWords = { ...existingWords, [item.word]: true };

          // Update the category with the new words
          await set(userCategoryRef, updatedWords);
          console.log('Added word to category');
        } else {
          // If the category doesn't exist, create it with the new word
          await set(userCategoryRef, { [item.word]: true });
          console.log('Added word to category');
        }
      } catch (error) {
        console.error('Error adding word to category: ' + error.message);
      }
    },
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const userCategoryRef = ref(FirebaseService.getInstance().database, `data/${userEmail}/categories/${category}`);
      const updatedUserCategoryRef = ref(FirebaseService.getInstance().database, `data/${userEmail}/categories/${updatedCategory}`);
  
      // Get the data from the old reference
      const categorySnapshot = await get(userCategoryRef);
      if (categorySnapshot.exists()) {
        const categoryData = categorySnapshot.val();
  
        // Copy the data to the new reference
        await set(updatedUserCategoryRef, categoryData);
  
        // Remove the old reference
        await remove(userCategoryRef);
  
        setEditing(false); // Exit edit mode
      } else {
        console.error('Category not found');
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
  
  

  // Function to open the CategoryModal and set the selected category
  const openCategoryModal = () => {
    setSelectedCategory(category);
    setShowCategoryModal(true);
  };

  return (
    <div className="button-container" data-cy={"category-" + category}>
      <div className="category-button" ref={drop}>
        {editing ? (
          <div className="category-button-edit">
            <input
              type="text"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
            />
            <button className="edit-button" onClick={handleUpdate}>Save</button>
          </div>
        ) : (
          <div className="category-button-view">
            <button className="profileCategoryButton" onClick={openCategoryModal}>
              {updatedCategory}
            </button>
          </div>
        )}
      </div>
      {/* Render the CategoryModal conditionally */}
      {showCategoryModal && selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => setShowCategoryModal(false)} // Close the modal
        />
      )}
      <div className="category-button-footer">
        <button className="edit-button" onClick={handleEdit}>Edit</button>
        <button className="delete-button" data-cy={"delete-category-button-" + category} onClick={() => onDelete(category)}>Delete</button>
      </div>
    </div>
  );
};

export default CategoryButton;

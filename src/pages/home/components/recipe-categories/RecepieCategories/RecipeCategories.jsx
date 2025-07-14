import React, { useState } from "react";
import styles from "./RecipeCategories.module.css";
import CategoriesBlock from "@components/СategoriesBlock/components/CategoriesBlock.jsx";
import { ButtonIcon } from "@components/ui/ButtonIcon/ButtonIcon";
import Heading from "@components/ui/Heading/Heading";
import { FiArrowLeft } from "react-icons/fi";

const RecipeCategories = () => {
  const [showRecipes, setShowRecipes] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategorySelect = async (category) => {
    setLoading(true);
    setError(null);
    
    try {
      // Here we would make the actual API call to get recipes by category
      // For now, we'll simulate a successful response
      // const response = await fetch(`https://project-team-3-backend-2.onrender.com/api/recipes?category=${category}`);
      // const data = await response.json();
      
      // Simulating API call
      setTimeout(() => {
        setSelectedCategory(category);
        setShowRecipes(true);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to load recipes. Please try again later.");
      setLoading(false);
      
      // Show error notification
      // This would be replaced with a proper notification component
      alert("Failed to load recipes. Please try again later.");
    }
  };

  const handleBackClick = () => {
    setShowRecipes(false);
    setSelectedCategory("");
  };

  return (
    <div className={styles.container}>
      {showRecipes ? (
        <div className={styles.recipesContainer}>
          <div className={styles.header}>
            <ButtonIcon onClick={handleBackClick} className={styles.backButton}>
              <FiArrowLeft />
            </ButtonIcon>
            <div className={styles.titleContainer}>
              <Heading level={2} size="lg" className={styles.title}>
                {selectedCategory}
              </Heading>
            </div>
          </div>
          {loading ? (
            <div className={styles.loading}>Loading recipes...</div>
          ) : (
            <div className={styles.recipesContent}>
              {/* Recipe content will be implemented later */}
              <div className={styles.placeholder}>
                Recipe list for {selectedCategory} will be displayed here
              </div>
            </div>
          )}
        </div>
      ) : (
        <CategoriesBlock onCategorySelect={handleCategorySelect} />
      )}
      
      {error && (
        <div className={styles.errorNotification}>
          {error}
          <button onClick={() => setError(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default RecipeCategories;

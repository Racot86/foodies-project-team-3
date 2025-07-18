import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.css';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  fetchRecipeById,
  processRecipeData,
  checkFavoriteStatus,
  toggleFavoriteStatus
} from '@/redux/slices/recipeDetailsSlice';
import PopularRecipes from "@pages/popular-recipes/PopularRecipes.jsx";

export const RecipeDetails = () => {
  const { recipeId } = useParams();
  const token = useSelector((state) => state?.auth?.token);
  const dispatch = useAppDispatch();

  // Get recipe details from Redux store
  const {
    isLoading,
    error,
    processedData,
    isFavorite
  } = useAppSelector((state) => state.recipeDetails);

  const { recipe = null, categoryName = '', author = null } = processedData || {};

  useEffect(() => {
    // Fetch recipe details using Redux action
    dispatch(fetchRecipeById(recipeId));
  }, [recipeId, dispatch]);

  useEffect(() => {
    // Process recipe data after fetching
    dispatch(processRecipeData());
  }, [dispatch, recipeId]);

  useEffect(() => {
    // Check if recipe is in favorites
    if (recipe && token) {
      dispatch(checkFavoriteStatus({ recipeId: recipe._id || recipe.id, token }));
    }
  }, [recipe, token, dispatch]);

  const handleToggleFavorite = () => {
    if (!recipe || !token) {
      alert('Please sign in to manage favorites.');
      return;
    }

    const recipeID = recipe._id || recipe.id;
    if (!recipeID) {
      console.error('Recipe ID missing!');
      return;
    }

    dispatch(toggleFavoriteStatus({
      recipeId: recipeID,
      isFavorite,
      token
    }));
  };

  const getFullImageUrl = (imgPath) => {
    if (!imgPath) return '';
    return imgPath.startsWith('http')
      ? imgPath
      : `https://project-team-3-backend-2.onrender.com${imgPath}`;
  };

  // Handle loading state
  if (isLoading) return <div className={styles.loading}>Loading recipe...</div>;

  // Handle error state
  if (error) return <div className={styles.notFound}>Error: {error}</div>;

  // Handle no recipe data
  if (!recipe && !isLoading) return <div className={styles.notFound}>Recipe not found</div>;

  return (
    <div className={styles.recipeDetail}>
      <div className={styles.recipeContent}>
        <div className={styles.recipeImageContainer}>
          {recipe.image ? (
            <img src={getFullImageUrl(recipe.image)} alt={recipe.title} className={styles.image} />
          ) : (
            <div className={styles.imagePlaceholder}>{recipe.title[0]}</div>
          )}
        </div>

        <div className={styles.allButImage}>
          <h1 className={styles.recipeName}>{recipe.title}</h1>

          <div className={styles.recipeCategoryTime}>
            {categoryName && <p className={styles.category}>{categoryName}</p>}
            <p className={styles.prepTime}>{recipe.time} min</p>
          </div>

          {recipe.description && <p className={styles.description}>{recipe.description}</p>}

          {author && (
            <div className={styles.authorContainer}>
              <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
              <div className={styles.authorInfo}>
                <p className={styles.createdBy}>Created by:</p>
                <p className={styles.authorName}>{author.name}</p>
              </div>
            </div>
          )}

          {recipe.ingredients?.length > 0 && (
            <div className={styles.ingredientsSection}>
              <h2 className={styles.ingredients}>Ingredients</h2>
              <div className={styles.ingredientsGrid}>
                {recipe.ingredients.map((ing, index) => (
                  <div key={index} className={styles.ingredientCard}>
                    <div className={styles.imageWrapper}>
                      {ing.image ? (
                        <img src={ing.image} alt={ing.name} className={styles.ingredientImage} />
                      ) : (
                        <div className={styles.ingredientPlaceholder}>{ing.name[0]}</div>
                      )}
                    </div>
                    <div className={styles.nameMeasure}>
                      <p className={styles.ingredientName}>{ing.name}</p>
                      <p className={styles.ingredientMeasure}>{ing.measure}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.recipeInfo}>
            <h2 className={styles.ingredients}>RECIPE PREPARATION</h2>
            {recipe.instructions
            .split(/\r\n\r\n/)
            .map((paragraph, index) => (
    <p key={index} className={styles.instructions}>
      {paragraph.trim()}
    </p>
))}

          </div>

          <div className={styles.favoriteSection}>
            <button
              className={`${styles.favButton} ${isFavorite ? styles.active : ''}`}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          </div>
        </div>
      </div>
      <PopularRecipes />
    </div>
  );
};

export default RecipeDetails;

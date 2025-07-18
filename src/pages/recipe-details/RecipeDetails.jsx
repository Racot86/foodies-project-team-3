import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipeName, clearRecipeName } from '@/redux/slices/breadcrumbsSlice.js';
import PopularRecipes from "@pages/popular-recipes/PopularRecipes.jsx";

export const RecipeDetails = () => {
  const { recipeId } = useParams();
  const dispatch = useDispatch();
  const recipeName = useSelector((state) => state?.breadcrumbs?.recipeName);
  const token = useSelector((state) => state?.auth?.token);

  const [recipe, setRecipe] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [author, setAuthor] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://project-team-3-backend-2.onrender.com/api/recipes/${recipeId}`);
        if (!response.ok) throw new Error('Recipe not found');
        const data = await response.json();

        // Categories
        const catsRes = await fetch('https://project-team-3-backend-2.onrender.com/api/categories');
        const cats = await catsRes.json();
        const found = cats.find((c) => c.name === data.category?.name || c._id === data.category?.id);
        if (found) setCategoryName(found.name);

        // Ingredients
        const ingRes = await fetch('https://project-team-3-backend-2.onrender.com/api/ingredients');
        const allIngredients = await ingRes.json();
        const enrichedIngredients = data.ingredients.map((item) => {
          const idToMatch = item.id || item.ingredient?.id;
          const full = allIngredients.find((ing) => ing._id === idToMatch);
          return {
            ...item,
            name: full?.name || item.ingredient?.name || 'Unknown',
            image: full?.thumb || item.ingredient?.image || '',
          };
        });

        // Set recipe with ensured _id
        setRecipe({ ...data, _id: data._id || data.id, ingredients: enrichedIngredients });

        // Author
        setAuthor({
          name: data.owner?.name || 'Unknown Author',
          avatar: data.owner?.avatar || 'https://i.pravatar.cc/150?img=13',
        });

        // Check if it's in favorites
        if (token) {
          const favRes = await fetch('https://project-team-3-backend-2.onrender.com/api/recipes/myfavorites', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (favRes.ok) {
            const favData = await favRes.json();
            const isFav = (favData?.favorites || []).some(
                  (fav) => fav._id === data._id || fav.id === data.id
);
            setIsFavorite(isFav);
          }
        }

      } catch (error) {
        console.error('Failed to load recipe data:', error.message);
      }
    };

    fetchRecipe();
  }, [recipeId, token]);

  useEffect(() => {
    if (recipe) dispatch(setRecipeName(recipe.title));
    return () => dispatch(clearRecipeName());
  }, [dispatch, recipe]);

  const handleToggleFavorite = async () => {
    if (!recipe || !token) {
      alert('Please sign in to manage favorites.');
      return;
    }

    const recipeID = recipe._id || recipe.id;
    if (!recipeID) {
      console.error('Recipe ID missing!');
      return;
    }

    const url = `https://project-team-3-backend-2.onrender.com/api/recipes/${recipeID}/favorites`;

    try {
      const response = await fetch(url, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Favorite update failed: ${response.status}`);
      setIsFavorite((prev) => !prev);
    } catch (err) {
      console.error('Favorite toggle failed:', err.message);
    }
  };

  const getFullImageUrl = (imgPath) => {
    if (!imgPath) return '';
    return imgPath.startsWith('http')
      ? imgPath
      : `https://project-team-3-backend-2.onrender.com${imgPath}`;
  };

  if (!recipe) return <div className={styles.notFound}>Recipe not found</div>;

  return (
    <div className={styles.recipeDetail}>
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>HOME</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.current}>{recipeName}</span>
      </div>

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

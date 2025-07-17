import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipesByCategory } from '@/services/recipeService';
import { Heading, Text, Pagination } from '@components/ui';
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchAreas } from '@/redux/slices/areasSlice';
import { fetchIngredients } from '@/redux/slices/ingredientsSlice';
import RecipeCard from '@/components/recipeCard/RecipeCard';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './BrowseCategory.module.css';

const BrowseCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [recipes, setRecipes] = useState([]);
  const [categoryData, setCategoryData] = useState({ description: '' }); // Placeholder for description
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recipesPerPage = 9;

  // Filter state
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  // Get areas and ingredients from Redux store
  const { data: areas, isLoading: areasLoading } = useAppSelector((state) => state.areas);
  const { data: ingredients, isLoading: ingredientsLoading } = useAppSelector((state) => state.ingredients);

  // Fetch areas and ingredients if not already loaded
  useEffect(() => {
    if (areas.length === 0) {
      dispatch(fetchAreas());
    }
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, areas.length, ingredients.length]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const options = {
          page: currentPage,
          limit: recipesPerPage,
          ingredient: selectedIngredient || undefined,
          area: selectedArea || undefined,
        };
        const data = await getRecipesByCategory(categoryName, options);

        if (data && data.recipes) {
          setRecipes(data.recipes);
          setTotalPages(Math.ceil(data.total / recipesPerPage));
          // In a real app, you'd fetch category details from an API
          // For now, we'll use a placeholder description.
          setCategoryData({ description: `Recipes from the ${categoryName} category.` });
        } else {
          setRecipes([]);
          setTotalPages(0);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch recipes.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [categoryName, currentPage, selectedArea, selectedIngredient]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Transform areas and ingredients data into options format for CustomSelect
  const areaOptions = (areas || []).map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const ingredientOptions = (ingredients || []).map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredient(ingredient?.value || "");
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area?.value || "");
    setCurrentPage(1); // Reset to first page when filter changes
  };

  if (isLoading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.categoryPage}>
      <div className={styles.header}>
          <div className={styles.backLinkContainer}>
            <button onClick={() => navigate(-1)} className={styles.backLink}>
              <FiArrowLeft /> Back
            </button>
          </div>
          <Heading level={1} size="2xl" className={styles.mainTitle}>
            {categoryName}
          </Heading>
          <Text variant="body" size="lg" className={styles.subtitle}>
            {categoryData.description}
          </Text>
      </div>

      <div className={styles.filtersContainer}>
          <div className={styles.filters}>
            <CustomSelect
              options={ingredientOptions}
              placeholder={ingredientsLoading ? 'Loading...' : 'Select Ingredient'}
              onChange={handleIngredientChange}
              value={selectedIngredient}
              className={styles.customSelect}
              disabled={ingredientsLoading}
            />
            <CustomSelect
              options={areaOptions}
              placeholder={areasLoading ? 'Loading...' : 'Select Region'}
              onChange={handleAreaChange}
              value={selectedArea}
              className={styles.customSelect}
              disabled={areasLoading}
            />
          </div>
          <div className={styles.recipesContainer}>
              <div className={styles.recipeList}>
                {recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipeId={recipe.id} />
                  ))
                ) : (
                  <p>No recipes found in this category.</p>
                )}
              </div>
              {totalPages > 1 && (
                <div className={styles.paginationContainer}>
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default BrowseCategory;


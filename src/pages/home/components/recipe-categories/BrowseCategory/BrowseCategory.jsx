import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heading, Text, Pagination } from '@components/ui';
import { CustomSelect } from "@/components/ui/CustomSelect";
import RecipeCard from '@/components/recipeCard/RecipeCard';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './BrowseCategory.module.css';
import { getRecipes } from '@/services/recipeService';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchIngredients } from '@/redux/slices/ingredientsSlice';
import { fetchAreas } from '@/redux/slices/areasSlice';

const BrowseCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get ingredients and areas from Redux store
  const { data: ingredients, isLoading: ingredientsLoading } = useAppSelector((state) => state.ingredients);
  const { data: areas, isLoading: areasLoading } = useAppSelector((state) => state.areas);

  // State for filters and pagination
  const [selectedCategory, setSelectedCategory] = useState(categoryName || "");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesData, setRecipesData] = useState({
    recipes: [],
    total: 0,
    totalPages: 0,
    page: 1
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fixed limit for recipes per page
  const RECIPES_PER_PAGE = 12;

  // Fetch ingredients and areas from API when component mounts
  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
    if (areas.length === 0) {
      dispatch(fetchAreas());
    }
  }, [dispatch, ingredients.length, areas.length]);

  // Update selectedCategory when categoryName changes
  useEffect(() => {
    if (categoryName !== undefined) {
      setSelectedCategory(categoryName);
    }
  }, [categoryName]);

  // Function to fetch recipes with current filters and pagination
  const fetchRecipesWithFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      const options = {
        category: selectedCategory,
        ingredient: selectedIngredient,
        area: selectedArea,
        page: currentPage,
        limit: RECIPES_PER_PAGE
      };

      const data = await getRecipes(options);
      setRecipesData(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedIngredient, selectedArea, currentPage]);

  // Fetch recipes when filters or pagination change
  useEffect(() => {
    fetchRecipesWithFilters();
  }, [fetchRecipesWithFilters]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Helper function to handle filter changes
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1); // Reset to first page when filter changes
    // Reset totalPages to avoid showing stale pagination
    setRecipesData(prevData => ({
      ...prevData,
      totalPages: 0
    }));
  };

  // Format ingredients data for select options
  const ingredientOptions = ingredients.map(item => ({
    value: item.name,
    label: item.name
  }));

  // Format areas data for select options
  const areaOptions = areas.map(item => ({
    value: item.name,
    label: item.name
  }));

  // Ensure recipesData and its properties are always defined
  const recipes = recipesData?.recipes || [];

  // Get category information
  const categoryInfo = recipesData?.category || {
    name: selectedCategory || "All Recipes",
    description: selectedCategory ? `Recipes from the ${selectedCategory} category.` : "Browse all recipes."
  };

  return (
    <div className={styles.categoryPage}>
      <div className={styles.header}>
          <div className={styles.backLinkContainer}>
            <button
              className={styles.backLink}
              onClick={() => navigate('/')}
            >
              <FiArrowLeft /> Back
            </button>
          </div>
          <Heading level={1} size="2xl" className={styles.mainTitle}>
            {categoryInfo.name}
          </Heading>
          <Text variant="body" size="lg" className={styles.subtitle}>
            {categoryInfo.description}
          </Text>
      </div>

      <div className={styles.filtersContainer}>
          <div className={styles.filters}>
            <CustomSelect
              options={ingredientOptions}
              placeholder={ingredientsLoading ? "Loading ingredients..." : "Select Ingredient"}
              className={styles.customSelect}
              isDisabled={ingredientsLoading || isLoading}
              onChange={(option) => handleFilterChange(setSelectedIngredient, option ? option.value : "")}
              value={selectedIngredient}
            />
            <CustomSelect
              options={areaOptions}
              placeholder={areasLoading ? "Loading regions..." : "Select Region"}
              className={styles.customSelect}
              isDisabled={areasLoading || isLoading}
              onChange={(option) => handleFilterChange(setSelectedArea, option ? option.value : "")}
              value={selectedArea}
            />
          </div>
          <div className={styles.recipesContainer}>
              {isLoading ? (
                <div className={styles.loadingContainer}>
                  <p>Loading recipes...</p>
                </div>
              ) : (
                <>
                  <div className={styles.recipeList}>
                    {recipes.length > 0 ? (
                      recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                      ))
                    ) : (
                      <p>No recipes found with the selected filters.</p>
                    )}
                  </div>
                  {recipes.length > 0 && recipesData?.totalPages > 0 && (
                    <div className={styles.paginationContainer}>
                      <Pagination
                        totalPages={recipesData.totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
          </div>
      </div>
    </div>
  );
};

export default BrowseCategory;

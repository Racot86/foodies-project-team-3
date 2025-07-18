import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Heading, Text, Pagination } from '@components/ui';
import { CustomSelect } from "@/components/ui/CustomSelect";
import RecipeCard from '@/components/recipeCard/RecipeCard';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './BrowseCategory.module.css';
import { fetchIngredients } from '@/redux/slices/ingredientsSlice';
import { fetchAreas } from '@/redux/slices/areasSlice';
import { getRecipes } from '@/services/recipeService';

const BrowseCategory = () => {
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const navigate = useNavigate();

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

  // Get data from Redux store
  const { data: ingredients, isLoading: ingredientsLoading } = useSelector(state => state.ingredients);
  const { data: areas, isLoading: areasLoading } = useSelector(state => state.areas);

  // Fetch ingredients and areas data when component mounts
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchAreas());
  }, [dispatch]);

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

  // Transform ingredients data for select options
  const ingredientOptions = ingredients?.map(ingredient => ({
    value: ingredient.name || ingredient.title,
    label: ingredient.name || ingredient.title
  })) || [];

  // Transform areas data for select options
  const areaOptions = areas?.map(area => ({
    value: area.name || area.title,
    label: area.name || area.title
  })) || [];

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
                        <RecipeCard key={recipe.id} recipeId={recipe.id} />
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


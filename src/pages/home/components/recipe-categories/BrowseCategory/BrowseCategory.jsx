import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
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
    page: 1,
    limit: 12
  });
  const [isLoading, setIsLoading] = useState(false);

  // Use a ref to store the limit value to avoid dependency cycle
  const limitRef = useRef(12);

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

  // Update limitRef when recipesData.limit changes
  useEffect(() => {
    limitRef.current = recipesData.limit;
  }, [recipesData.limit]);

  // Function to fetch recipes with current filters and pagination
  const fetchRecipesWithFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      const options = {
        category: selectedCategory,
        ingredient: selectedIngredient,
        area: selectedArea,
        page: currentPage,
        limit: limitRef.current
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

  // Transform ingredients data for select options
  const ingredientOptions = useMemo(() => {
    const options = [];

    if (ingredients && ingredients.length > 0) {
      ingredients.forEach(ingredient => {
        options.push({
          value: ingredient.name || ingredient.title,
          label: ingredient.name || ingredient.title
        });
      });
    }

    return options;
  }, [ingredients]);

  // Transform areas data for select options
  const areaOptions = useMemo(() => {
    const options = [];

    if (areas && areas.length > 0) {
      areas.forEach(area => {
        options.push({
          value: area.name || area.title,
          label: area.name || area.title
        });
      });
    }

    return options;
  }, [areas]);

  // Get recipes from state
  const { recipes } = recipesData;

  // Use totalPages from API response
  const { totalPages } = recipesData;

  // Get category information
  const categoryInfo = recipesData.category || {
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
              onChange={(option) => {
                setSelectedIngredient(option ? option.value : "");
                setCurrentPage(1); // Reset to first page when ingredient changes
                // Reset totalPages to avoid showing stale pagination
                setRecipesData(prevData => ({
                  ...prevData,
                  totalPages: 0
                }));
              }}
              value={selectedIngredient}
            />
            <CustomSelect
              options={areaOptions}
              placeholder={areasLoading ? "Loading regions..." : "Select Region"}
              className={styles.customSelect}
              isDisabled={areasLoading || isLoading}
              onChange={(option) => {
                setSelectedArea(option ? option.value : "");
                setCurrentPage(1); // Reset to first page when region changes
                // Reset totalPages to avoid showing stale pagination
                setRecipesData(prevData => ({
                  ...prevData,
                  totalPages: 0
                }));
              }}
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
                    {recipes && recipes.length > 0 ? (
                      recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipeId={recipe.id} />
                      ))
                    ) : (
                      <p>No recipes found with the selected filters.</p>
                    )}
                  </div>
                  {recipes && recipes.length > 0 && totalPages > 0 && (
                    <div className={styles.paginationContainer}>
                      <Pagination
                        totalPages={totalPages}
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


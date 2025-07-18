import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heading, Text, Pagination } from '@components/ui';
import { CustomSelect } from "@/components/ui/CustomSelect";
import RecipeCard from '@/components/recipeCard/RecipeCard';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './BrowseCategory.module.css';
import { getRecipes } from '@/services/recipeService';

const BrowseCategory = () => {
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

  // State for extracted ingredients and areas
  const [extractedIngredients, setExtractedIngredients] = useState([]);
  const [extractedAreas, setExtractedAreas] = useState([]);
  const [ingredientsLoading, setIngredientsLoading] = useState(false);
  const [areasLoading, setAreasLoading] = useState(false);

  // Fixed limit for recipes per page
  const RECIPES_PER_PAGE = 12;

  // Update selectedCategory when categoryName changes
  useEffect(() => {
    if (categoryName !== undefined) {
      setSelectedCategory(categoryName);
    }
  }, [categoryName]);

  // Function to extract unique ingredients from recipes
  const extractUniqueIngredients = useCallback((recipes) => {
    setIngredientsLoading(true);
    try {
      // Create a Set to store unique ingredient names
      const uniqueIngredientNames = new Set();

      // Extract ingredients from each recipe
      recipes.forEach(recipe => {
        // Check if recipe has ingredients array
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
          recipe.ingredients.forEach(ingredientItem => {
            // First check for the nested structure (as shown in the issue description)
            if (ingredientItem.ingredient && ingredientItem.ingredient.name) {
              uniqueIngredientNames.add(ingredientItem.ingredient.name);
            }
            // Fallback to direct name property if nested structure doesn't exist
            else if (ingredientItem.name) {
              uniqueIngredientNames.add(ingredientItem.name);
            }
          });
        }
      });

      // Convert Set to array of objects with value and label properties
      const ingredientsArray = Array.from(uniqueIngredientNames).map(name => ({
        value: name,
        label: name
      }));

      // Sort ingredients alphabetically
      ingredientsArray.sort((a, b) => a.label.localeCompare(b.label));

      // Only update state if there are ingredients or if it's the first load
      if (ingredientsArray.length > 0 || extractedIngredients.length === 0) {
        setExtractedIngredients(ingredientsArray);
      }
    } catch (error) {
      console.error("Error extracting ingredients:", error);
      // Only set empty array if there are no ingredients already
      if (extractedIngredients.length === 0) {
        setExtractedIngredients([]);
      }
    } finally {
      setIngredientsLoading(false);
    }
  }, [extractedIngredients.length]);


  // Function to extract unique areas from recipes
  const extractUniqueAreas = useCallback((recipes) => {
    setAreasLoading(true);
    try {
      // Create a Set to store unique area names
      const uniqueAreaNames = new Set();

      // Extract areas from each recipe
      recipes.forEach(recipe => {
        // Check if recipe has area information
        if (recipe.area && recipe.area.name) {
          uniqueAreaNames.add(recipe.area.name);
        }
      });

      // Convert Set to array of objects with value and label properties
      const areasArray = Array.from(uniqueAreaNames).map(name => ({
        value: name,
        label: name
      }));

      // Sort areas alphabetically
      areasArray.sort((a, b) => a.label.localeCompare(b.label));

      // Only update state if there are areas or if it's the first load
      if (areasArray.length > 0 || extractedAreas.length === 0) {
        setExtractedAreas(areasArray);
      }
    } catch (error) {
      console.error("Error extracting areas:", error);
      // Only set empty array if there are no areas already
      if (extractedAreas.length === 0) {
        setExtractedAreas([]);
      }
    } finally {
      setAreasLoading(false);
    }
  }, [extractedAreas.length]);

  // This function is no longer needed as we're extracting ingredients directly from the initial API response

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

      // Extract ingredients and areas directly from the fetched recipes
      if (data.recipes && data.recipes.length > 0) {
        extractUniqueIngredients(data.recipes);
        extractUniqueAreas(data.recipes);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedIngredient, selectedArea, currentPage, extractUniqueIngredients, extractUniqueAreas]);

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

  // Use extracted ingredients and areas for select options
  const ingredientOptions = extractedIngredients;
  const areaOptions = extractedAreas;

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


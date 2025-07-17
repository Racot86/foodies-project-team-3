import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipesByCategory } from '@/services/recipeService';
import { Heading, Text, Pagination } from '@components/ui';
import { IngredientSelect } from "@/components/ui/Fields/IngredientSelect/IngredientSelect"; 
import { AreaSelect } from "@/components/ui/Fields/AreaSelect/AreaSelect";
import RecipeCard from '@/components/recipeCard/RecipeCard';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './BrowseCategory.module.css';

const BrowseCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

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

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredient(ingredient?.value || "");
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area?.value || "");
    setCurrentPage(1); // Reset to first page when filter changes
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading recipes...</div>; 
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
            <IngredientSelect
              value={selectedIngredient}
              onChange={handleIngredientChange}
              wrapperClassName={styles.fullWidthWrapper}
              selectWrapperClassName={styles.unlimitedMaxWidth}
              optionsListClassName={styles.fullWidthInner}
              selectedValueClassName={styles.fullWidthInner}
            />
            <AreaSelect
              value={selectedArea}
              onChange={handleAreaChange}
              wrapperClassName={styles.fullWidthWrapper}
              selectWrapperClassName={styles.unlimitedMaxWidth}
              optionsListClassName={styles.fullWidthInner}
              selectedValueClassName={styles.fullWidthInner}
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


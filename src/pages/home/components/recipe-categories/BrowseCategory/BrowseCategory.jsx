import React, { useEffect, useState, useCallback, useRef } from 'react';
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
import PageTransitionWrapper from "@components/pageTransitionWrapper/PageTransitionWrapper.jsx";

const BrowseCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categoryPageRef = useRef(null);


  const { data: ingredients, isLoading: ingredientsLoading } = useAppSelector((state) => state.ingredients);
  const { data: areas, isLoading: areasLoading } = useAppSelector((state) => state.areas);


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


  const RECIPES_PER_PAGE = 12;


  useEffect(() => {

    dispatch(fetchIngredients({
      category: selectedCategory || undefined,
      area: selectedArea || undefined,
      assignedToRecipes: true,
      filter: true
    }));


    dispatch(fetchAreas({
      category: selectedCategory || undefined,
      ingredient: selectedIngredient || undefined,
      assignedToRecipes: true,
      filter: true
    }));
  }, [dispatch, selectedCategory, selectedArea, selectedIngredient]);


  useEffect(() => {
    if (categoryName !== undefined) {
      setSelectedCategory(categoryName);
    }
  }, [categoryName]);


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
    } catch {
      // Error handling without console.error
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedIngredient, selectedArea, currentPage]);


  useEffect(() => {
    fetchRecipesWithFilters();
  }, [fetchRecipesWithFilters]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    if (categoryPageRef.current) {
      categoryPageRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };




  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);

    setRecipesData(prevData => ({
      ...prevData,
      totalPages: 0
    }));
  };


  const ingredientOptions = ingredients.map(item => ({
    value: item.name,
    label: item.name
  }));


  const areaOptions = areas.map(item => ({
    value: item.name,
    label: item.name
  }));


  useEffect(() => {

    if (selectedIngredient && !ingredients.some(item => item.name === selectedIngredient)) {
      setSelectedIngredient("");
    }
  }, [ingredients, selectedIngredient]);

  useEffect(() => {

    if (selectedArea && !areas.some(item => item.name === selectedArea)) {
      setSelectedArea("");
    }
  }, [areas, selectedArea]);


  const recipes = recipesData?.recipes || [];


  const categoryInfo = recipesData?.category || {
    name: selectedCategory || "All Recipes",
    description: selectedCategory ? `Recipes from the ${selectedCategory} category.` : "Browse all recipes."
  };

  return (
      <PageTransitionWrapper>
    <div className={styles.categoryPage} ref={categoryPageRef}>
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
              isClearable={true}
              isLoading={ingredientsLoading}
            />
            <CustomSelect
              options={areaOptions}
              placeholder={areasLoading ? "Loading regions..." : "Select Region"}
              className={styles.customSelect}
              isDisabled={areasLoading || isLoading}
              onChange={(option) => handleFilterChange(setSelectedArea, option ? option.value : "")}
              value={selectedArea}
              isClearable={true}
              isLoading={areasLoading}
            />
          </div>
          <div className={styles.recipesContainer}>
            <div className={styles.recipeList}>
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} loading={isLoading} />
                ))
              ) : (
                <p>No recipes found with the selected filters.</p>
              )}
            </div>
            {recipes.length > 0 && recipesData?.totalPages > 1 && (
              <div className={styles.paginationContainer}>
                <Pagination
                  totalPages={recipesData.totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
      </div>
    </div>
      </PageTransitionWrapper>
  );
};

export default BrowseCategory;

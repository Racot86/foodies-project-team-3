import { useState, useMemo, useEffect } from "react";
import RecipeCard from "./RecipesCard.jsx";
import styles from "./RecipeCard.module.css";
import { Pagination } from "@/components/ui";

const ITEMS_PER_PAGE = 2;

const RecipeList = ({
  recipes,
  onDelete,
  currentPage: propCurrentPage,
  totalPages: propTotalPages,
  onPageChange: propOnPageChange,
  useServerPagination = false
}) => {
  const [localCurrentPage, setLocalCurrentPage] = useState(1);

  // Use props or calculate locally based on useServerPagination
  const currentPage = useServerPagination ? propCurrentPage : localCurrentPage;
  const totalPages = useServerPagination
    ? propTotalPages
    : Math.ceil(recipes.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (!useServerPagination && localCurrentPage > totalPages) {
      setLocalCurrentPage(totalPages || 1);
    }
  }, [recipes, localCurrentPage, totalPages, useServerPagination]);

  const currentRecipes = useMemo(() => {
    if (useServerPagination) {
      // When using server pagination, all recipes from the current page are already fetched
      return recipes;
    } else {
      // For client-side pagination, slice the recipes array
      const start = (localCurrentPage - 1) * ITEMS_PER_PAGE;
      return recipes.slice(start, start + ITEMS_PER_PAGE);
    }
  }, [recipes, localCurrentPage, useServerPagination]);

  const handlePageChange = (page) => {
    if (useServerPagination) {
      // For server-side pagination, call the provided callback
      propOnPageChange(page);
    } else {
      // For client-side pagination, update local state
      setLocalCurrentPage(page);
    }
  };

  const listClassName =
    totalPages > 1
      ? `${styles.recipeCardList} ${styles.hasPagination}`
      : styles.recipeCardList;

  return (
    <>
      <ul className={listClassName}>
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id || recipe._id}
            data={recipe}
            onDelete={() => onDelete(recipe._id || recipe.id)}
          />
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default RecipeList;

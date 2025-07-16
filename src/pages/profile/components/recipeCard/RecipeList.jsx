import { useState, useMemo, useEffect } from "react";
import RecipeCard from "./RecipesCard.jsx";
import styles from "./RecipeCard.module.css";
import { Pagination } from "@/components/ui";

const ITEMS_PER_PAGE = 2;

const RecipeList = ({ recipes, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);

  // Сбрасываем страницу, если recipes уменьшился и текущая страница стала невалидной
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [recipes, currentPage, totalPages]);

  const currentRecipes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return recipes.slice(start, start + ITEMS_PER_PAGE);
  }, [recipes, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ul className={styles.recipeCardList}>
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
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

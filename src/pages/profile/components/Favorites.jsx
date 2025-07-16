import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  deleteFavorite,
} from "@/redux/slices/favoriteRecipeSlice";

import css from "./RecipesList.module.css"; // стили
import RecipeList from "./recipeCard/RecipeList";
import EmptyState from "./recipeCard/EmptyState";

const Favorites = () => {
  const dispatch = useDispatch();

  // Получаем нужные части состояния
  const recipes = useSelector((state) => state.favorites.data);
  const isLoading = useSelector((state) => state.favorites.isLoading);
  const isDeleting = useSelector((state) => state.favorites.isDeleting);
  const error = useSelector((state) => state.favorites.error);

  // Получаем список при монтировании
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  // Обработчик удаления
  const handleDelete = (recipeId) => {
    dispatch(deleteFavorite(recipeId));
  };

  return (
    <div className={css.recipeWrap}>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : recipes.length > 0 ? (
        <RecipeList recipes={recipes} onDelete={handleDelete} />
      ) : (
        <EmptyState text="Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future." />
      )}

      {isDeleting && <p>Удаление...</p>}
      {error && <p className={css.error}>Ошибка: {error}</p>}
    </div>
  );
};

export default Favorites;

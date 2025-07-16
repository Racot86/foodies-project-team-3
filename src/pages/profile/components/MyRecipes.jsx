import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyRecipe, deleteMyRecipe } from "@/redux/slices/myRecipeSlice.js";
import RecipeList from "./recipeCard/RecipeList";
import EmptyState from "./recipeCard/EmptyState";
import css from "./RecipesList.module.css";

const MyRecipes = () => {
  const dispatch = useDispatch();
  // Добавляем isDeleting из состояния
  const { data, isLoading, isDeleting, error } = useSelector(
    (state) => state.myrecipe
  );

  // Предполагается, что data — объект с recipes, или пустой массив
  const recipes = data?.recipes || data || [];

  useEffect(() => {
    dispatch(fetchMyRecipe());
  }, [dispatch]);

  const deleteRecipe = (id) => {
    dispatch(deleteMyRecipe(id));
  };

  // Показываем загрузку только при загрузке списка, а не при удалении
  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className={css.recipeWrap}>
      {recipes.length > 0 ? (
        <RecipeList recipes={recipes} onDelete={deleteRecipe} />
      ) : (
        <EmptyState text="Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future." />
      )}

      {/* Можно показать индикатор удаления, если нужно */}
      {isDeleting && <p>Удаление...</p>}
    </div>
  );
};

export default MyRecipes;

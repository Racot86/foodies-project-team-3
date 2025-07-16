import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyRecipe } from "@/redux/slices/myRecipeSlice.js";
import RecipeList from "./recipeCard/RecipeList";
import EmptyState from "./recipeCard/EmptyState";
import css from "./RecipesList.module.css";

const MyRecipes = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => state.myrecipe);

  const recipes = data?.recipes || [];

  console.log(recipes);

  useEffect(() => {
    dispatch(fetchMyRecipe());
  }, [dispatch]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className={css.recipeWrap}>
      {recipes.length > 0 ? (
        <RecipeList recipes={recipes} />
      ) : (
        <EmptyState text="Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future." />
      )}
    </div>
  );
};

export default MyRecipes;

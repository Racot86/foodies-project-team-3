import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  deleteFavorite,
} from "@/redux/slices/favoriteRecipeSlice";

import css from "./RecipesList.module.css";
import RecipeList from "./recipeCard/RecipeList";
import EmptyState from "./recipeCard/EmptyState";
import { toast } from "react-toastify";
import { Loader } from "@/components/ui";

const Favorites = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  }, [error]);

  const recipes = data || [];

  const handleDelete = (recipeId) => {
    dispatch(deleteFavorite(recipeId));
  };

  return (
    <div className={css.recipeWrap}>
      {isLoading && <Loader />}

      {!isLoading && recipes.length > 0 ? (
        <RecipeList recipes={recipes} onDelete={handleDelete} />
      ) : !isLoading && recipes.length === 0 ? (
        <EmptyState text="Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future." />
      ) : null}
    </div>
  );
};

export default Favorites;

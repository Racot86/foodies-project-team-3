import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyRecipe, deleteMyRecipe } from "@/redux/slices/myRecipeSlice.js";
import RecipeList from "./recipeCard/RecipeList";
import EmptyState from "./recipeCard/EmptyState";
import css from "./RecipesList.module.css";
import { toast } from "react-toastify";
// import Loader from "@/components/Loader";

const MyRecipes = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isDeleting, error } = useSelector(
    (state) => state.myrecipe
  );

  const recipes = data?.recipes || data || [];

  useEffect(() => {
    dispatch(fetchMyRecipe());
  }, [dispatch]);

  const deleteRecipe = async (id) => {
    const result = await dispatch(deleteMyRecipe(id));
    if (deleteMyRecipe.fulfilled.match(result)) {
      dispatch(fetchMyRecipe());
    } else {
      toast.error(
        `Failed to delete the recipe: ${result.payload || "Unknown error"}`
      );
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  }, [error]);

  return (
    <div className={css.recipeWrap}>
      {/* {isLoading && <Loader />}
      {isDeleting && <Loader >} */}

      {!isLoading && recipes.length > 0 ? (
        <RecipeList recipes={recipes} onDelete={deleteRecipe} />
      ) : !isLoading ? (
        <EmptyState text="Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future." />
      ) : null}
    </div>
  );
};

export default MyRecipes;

import { useDispatch, useSelector } from "react-redux";
// import SmallRecipePhoto from "../SmallRecipePhoto/SmallRecipePhoto";
// import IconButton from "../shared/IconButton/IconButton";
import styles from "./RecipeCard.module.css";
// import {
//   selectIsAuthorizedUser,
//   selectRecipes,
// } from "../../store/selectors/profileSelectors.js";
import { NavLink } from "react-router-dom";
import SmallRecipePhoto from "./RecipePhotoCard.jsx";
import { Button, ButtonIcon } from "@/components/ui";
import { FiTrash } from "react-icons/fi";
import { FaArrowUp } from "react-icons/fa6";
// import handleFavorite from "../../utilities/handleFavorite.js";
// import {
//   useRemoveFavoriteRecipeMutation,
//   useRemoveRecipeMutation,
// } from "../../store/services/recipeService.js";
// import { selectFavoriteRecipes } from "../../store/selectors/selectors.js";
// import { setFavoriteRecipes } from "../../store/features/favoriteRecipesSlice.js";
// import { setUserAddedRecipes } from "../../store/features/profileSlice.js";

const RecipeCard = ({ data }) => {
  const dispatch = useDispatch();
  //   const favoritesRecipe = useSelector(selectFavoriteRecipes);
  //   const recipes = useSelector(selectRecipes);
  //   const isAuthorizedUser = useSelector(selectIsAuthorizedUser);
  //   const [removeFavoriteRecipe] = useRemoveFavoriteRecipeMutation();
  //   const [removeRecipe] = useRemoveRecipeMutation();

  //   const deleteRecipe = () => {
  //     if (tab === "recipe") {
  //       dispatch(
  //         setUserAddedRecipes(recipes.filter((el) => el._id !== data._id))
  //       );
  //       removeRecipe(data._id);
  //     } else {
  //       dispatch(
  //         setFavoriteRecipes(favoritesRecipe.filter((el) => el !== data._id))
  //       );
  //       handleFavorite(removeFavoriteRecipe, data._id, "delete");
  //     }
  //   };

  return (
    <li className={styles.recipeCardWrapper}>
      <div className={styles.flexPhotoWrapper}>
        <SmallRecipePhoto imgUrl={data.image} title={data.title} />
        <div className={styles.recipeTextWrapper}>
          <h5 className={styles.recipeTitle}> {data.title} </h5>
          <p className={styles.recipeInstructions}>{data.instructions}</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <NavLink to={`/recipe/${data._id}`} className={styles.navLink}>
          <FaArrowUp />
        </NavLink>
        {/* {isAuthorizedUser && ( */}
        <ButtonIcon
          className="recipeTrash"
          variant={Button.variants.SECONDARY}
          onClick={() => {}}
        >
          <FiTrash />
        </ButtonIcon>
        {/* )} */}
      </div>
    </li>
  );
};

export default RecipeCard;

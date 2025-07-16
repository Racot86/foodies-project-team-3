import RecipeCard from "./RecipesCard";
import styles from "./RecipeCard.module.css";

const RecipeList = ({ recipes }) => {
  return (
    <ul className={styles.recipeCardList}>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard data={recipe} />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;

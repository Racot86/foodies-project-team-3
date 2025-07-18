import styles from "./RecipeCard.module.css";

const SmallRecipePhoto = ({ imgUrl, title }) => {
  return (
    <div className={styles.recipeCard}>
      <img
        className={styles.recipeImg}
        src={imgUrl !== "[object FileList]" ? imgUrl : "/images/no_image.jpg"}
        alt={title}
      />
    </div>
  );
};

export default SmallRecipePhoto;

import React from "react";
import styles from "./RecipePreviewCard.module.css";

const RecipePreviewCard = ({ imageUrl, index, isEmpty = false }) => {
  if (isEmpty) {
    return <div className={styles.emptySlot} />;
  }

  return (
    <div className={styles.recipeImage}>
      <img
        src={imageUrl}
        alt={`Recipe ${index + 1}`}
        className={styles.recipeImg}
      />
    </div>
  );
};

export default RecipePreviewCard;
export { RecipePreviewCard };

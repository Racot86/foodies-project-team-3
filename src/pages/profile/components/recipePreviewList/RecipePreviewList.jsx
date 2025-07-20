import React from "react";
import RecipePreviewCard from "../recipePreviewCard/RecipePreviewCard";
import styles from "./RecipePreviewList.module.css";

const RecipePreviewList = ({ recipesPreview = [], maxPreviews = 4 }) => {
  const previewImages = recipesPreview.slice(0, maxPreviews);

  return (
    <ul className={styles.recipePreview} data-preview-count={maxPreviews}>
      {previewImages.map((imageUrl, index) => (
        <RecipePreviewCard
          key={index}
          imageUrl={imageUrl}
          index={index}
          isEmpty={false}
        />
      ))}
      {/* Fill empty slots if less than max images */}
      {Array.from(
        { length: maxPreviews - previewImages.length },
        (_, index) => (
          <RecipePreviewCard
            key={`empty-${index}`}
            imageUrl=""
            index={previewImages.length + index}
            isEmpty={true}
          />
        )
      )}
    </ul>
  );
};

export default RecipePreviewList;
export { RecipePreviewList };

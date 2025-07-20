import React from 'react';
import styles from "./RecipeCard.module.css";

/**
 * RecipesCardSkeleton component
 * Displays a loading skeleton for recipe cards in the profile section
 */
const RecipesCardSkeleton = () => {
  // Create an array of 6 items to display multiple skeleton cards
  const skeletonItems = Array(6).fill(null);

  return (
    <>
      {skeletonItems.map((_, index) => (
        <li key={index} className={`${styles.recipeCardWrapper} ${styles.skeleton}`}>
          <div className={styles.flexPhotoWrapper}>
            {/* Recipe image skeleton */}
            <div className={`${styles.recipeCard} ${styles.skeletonPulse}`}>
              <div className={`${styles.recipeImg} ${styles.skeletonImage}`}></div>
            </div>

            <div className={styles.recipeTextWrapper}>
              {/* Recipe title skeleton */}
              <div className={`${styles.recipeTitle} ${styles.skeletonPulse} ${styles.skeletonTitle}`}></div>

              {/* Recipe instructions skeleton - two lines */}
              <div className={`${styles.recipeInstructions} ${styles.skeletonPulse} ${styles.skeletonText}`}></div>
              <div className={`${styles.recipeInstructions} ${styles.skeletonPulse} ${styles.skeletonText}`}></div>
            </div>
          </div>

          <div className={styles.buttonWrapper}>
            {/* Button skeletons */}
            <div className={`${styles.skeletonButton} ${styles.skeletonPulse}`}></div>
            <div className={`${styles.skeletonButton} ${styles.skeletonPulse}`}></div>
          </div>
        </li>
      ))}
    </>
  );
};

export default RecipesCardSkeleton;

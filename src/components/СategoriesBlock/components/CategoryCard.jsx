import React from "react";
import styles from "./CategoryCard.module.css";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * @param {Object} props
 * @param {string} [props.category]
 * @param {string} [props.image]
 * @param {boolean} [props.isAll]
 * @param {boolean} [props.isActive]
 * @param {Function} [props.onClick] - Callback when category is selected or toggle is clicked
 */
const CategoryCard = ({
  category,
  image,
  isAll = false,
  isActive,
  onClick,
}) => {
  if (isAll) {
    // Картка ALL CATEGORIES
    return (
      <div
        className={`${styles.card} ${styles.allCategoriesCard} ${isActive ? styles.active : ""}`}
        onClick={() => onClick && onClick()}
        tabIndex={0}
        role="button"
        aria-pressed={isActive}
      >
        <div className={styles.allCategoriesContent}>
          {isActive ? "HIDE EXTRA" : "ALL CATEGORIES"}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardLink}>
      <div className={styles.card}>
        <img src={image} alt={category} className={styles.image} loading="lazy" />
        <div className={styles.captionRow}>
          <span className={styles.caption}>{category}</span>
          <button 
            type="button" 
            className={styles.iconButton} 
            onClick={() => onClick && onClick(category)}
            aria-label={`View ${category} recipes`}
          >
            <FiArrowUpRight className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

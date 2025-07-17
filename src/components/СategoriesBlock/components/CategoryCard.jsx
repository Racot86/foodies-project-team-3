import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";
import { FiArrowUpRight } from "react-icons/fi";
/**
 * @param {Object} props
 * @param {string} [props.category]
 * @param {string} [props.image]
 * @param {boolean} [props.isAll]
 * @param {boolean} [props.isActive]
 * @param {function} [props.onClick]
 * @param {boolean} [props.wide]
 */
const CategoryCard = ({
  category,
  image,
  isAll = false,
  isActive,
  onClick,
  wide = false,
}) => {
  if (isAll) {
    // Картка ALL CATEGORIES
    return (
      <div
        className={`${styles.card} ${styles.allCategoriesCard} ${isActive ? styles.active : ""}`}
        onClick={onClick}
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
    <Link to={`/categories/${category}`} className={styles.cardLink}>
      <div className={`${styles.card} ${wide ? styles.cardWide : ""}`}
        data-wide={wide ? "true" : undefined}
      >
        <img src={image} alt={category} className={styles.image} loading="lazy" />
        <div className={styles.captionRow}>
          <span className={styles.caption}>{category}</span>
          <span className={styles.iconButton} aria-hidden="true">
            <FiArrowUpRight className={styles.icon} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

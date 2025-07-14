import React, {useState} from "react";
import PropTypes from "prop-types";
import CategoryCard from "./CategoryCard.jsx";
import styles from "./CategoryList.module.css";
import { INITIAL_CATEGORIES } from "../../../../constants/recipy_category.js"; 

const CategoryList = ({ onCategorySelect }) => {
  const [showAll, setShowAll] = useState(false);

  const VISIBLE_COUNT = 11;
  const visibleCategories = showAll
    ? INITIAL_CATEGORIES
    : INITIAL_CATEGORIES.slice(0, VISIBLE_COUNT);

  // AllCategoriesCard props
  const allCategoriesCardProps = {
    isActive: showAll,
    onClick: () => setShowAll((prev) => !prev),
  };

  return (
    <div className={styles.list}>
      {visibleCategories.map((cat) => (
        <CategoryCard
          key={cat.name}
          category={cat.name}
          image={cat.img}
          onClick={onCategorySelect}
        />
      ))}
      <CategoryCard isAll {...allCategoriesCardProps} />
    </div>
  );
};

CategoryList.propTypes = {
  onCategorySelect: PropTypes.func,
};

CategoryList.defaultProps = {
  onCategorySelect: () => {},
};

export default CategoryList;

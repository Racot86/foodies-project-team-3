import React, {useState} from "react";
import CategoryCard from "./CategoryCard.jsx";
import styles from "./CategoryList.module.css";
import { INITIAL_CATEGORIES } from "../../../../constants/recipy_category.js"; 

const CategoryList = () => {
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
        />
      ))}
      <CategoryCard isAll {...allCategoriesCardProps} />
    </div>
  );
};

export default CategoryList;


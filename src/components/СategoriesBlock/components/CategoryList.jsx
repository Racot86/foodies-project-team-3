import React, {useState, useEffect} from "react";
import CategoryCard from "./CategoryCard.jsx";
import styles from "./CategoryList.module.css";
//import { INITIAL_CATEGORIES } from "../../../../constants/recipy_category.js"; 

const categoryImages = {
  Beef: "/images/Images_categories/Beef.png",
  Breakfast: "/images/Images_categories/Breakfast.png",
  Dessert: "/images/Images_categories/Desserts.png",
  Lamb: "/images/Images_categories/Lamb.png",
  Goat: "/images/Images_categories/Goat.png",
  Miscellaneous: "/images/Images_categories/Miscellaneous.png",
  Pasta: "/images/Images_categories/Pasta.png",
  Pork: "/images/Images_categories/Pork.png",
  Seafood: "/images/Images_categories/Seafood.png",
  Side: "/images/Images_categories/Side.png",
  Starter: "/images/Images_categories/Starter.png",
  Vegetarian: "/images/Images_categories/Vegetarian.png",
  Vegan: "/images/Images_categories/Vegan.png",
  Chicken: "/images/Images_categories/Chicken.jpg",
  Soup: "/images/Images_categories/Soup.jpg",
};

const VISIBLE_COUNT = 11;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Фетч категорій з бекенду
  useEffect(() => {
    fetch("https://project-team-3-backend-2.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(sorted);
      })
      .catch(() => setCategories([]));
  }, []);

  // Логіка showAll
  const visibleCategories = showAll
    ? categories
    : categories.slice(0, VISIBLE_COUNT);

  // AllCategoriesCard props
  const allCategoriesCardProps = {
    isActive: showAll,
    onClick: () => setShowAll((prev) => !prev),
  };

  return (
    <div className={styles.list}>
      {visibleCategories.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat.name}
          image={categoryImages[cat.name] || "/images/default.png"}
        />
      ))}
      <CategoryCard isAll {...allCategoriesCardProps} />
    </div>
  );
};

export default CategoryList;


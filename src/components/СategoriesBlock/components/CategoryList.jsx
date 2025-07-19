import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard.jsx";
import styles from "./CategoryList.module.css";

const categoryImages = {
  Beef: "/images/Images_categories/Beef.webp",
  Breakfast: "/images/Images_categories/Breakfast.webp",
  Dessert: "/images/Images_categories/Desserts.webp",
  Lamb: "/images/Images_categories/Lamb.webp",
  Goat: "/images/Images_categories/Goat.webp",
  Miscellaneous: "/images/Images_categories/Miscellaneous.webp",
  Pasta: "/images/Images_categories/Pasta.webp",
  Pork: "/images/Images_categories/Pork.webp",
  Seafood: "/images/Images_categories/Seafood.webp",
  Side: "/images/Images_categories/Side.webp",
  Starter: "/images/Images_categories/Starter.webp",
  Vegetarian: "/images/Images_categories/Vegetarian.webp",
  Vegan: "/images/Images_categories/Vegan.webp",
  Chicken: "/images/Images_categories/Chicken.webp",
  Soup: "/images/Images_categories/Soup.webp",
};

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
const VISIBLE_COUNT_DESKTOP = 11;
const VISIBLE_COUNT_TABLET = 12;
const VISIBLE_COUNT_MOBILE = 8;

const CategoryList = () => {
   const width = useWindowWidth(); 
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("https://project-team-3-backend-2.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(sorted);
      })
      .catch(() => setCategories([]));
  }, []);

  let visibleCount = VISIBLE_COUNT_DESKTOP;
  if (width < 1440 && width >= 768) {
    visibleCount = VISIBLE_COUNT_TABLET;
  } else if (width < 768) {
    visibleCount = VISIBLE_COUNT_MOBILE;
  }

  const visibleCategories = showAll
    ? categories
    : categories.slice(0, visibleCount);

  const allCategoriesCardProps = {
    isActive: showAll,
    onClick: () => setShowAll((prev) => !prev),
    isAll: true,
  };

  return (
    <ul className={styles.list}>
      {visibleCategories.map((cat) => (
        <li key={cat.id} className={styles.item}>
          <CategoryCard
            category={cat.name}
            image={categoryImages[cat.name] || "/images/no_image.webp"}
          />
        </li>
      ))}
      <li className={`${styles.item} ${styles.allCategoriesCard}`}>
        <CategoryCard {...allCategoriesCardProps} />
      </li>
    </ul>
  );
};

export default CategoryList;

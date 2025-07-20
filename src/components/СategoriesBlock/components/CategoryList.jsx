import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard.jsx";
import styles from "./CategoryList.module.css";

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

  // Track if categories have been expanded to apply animations only to newly visible cards
  const [prevVisibleCount, setPrevVisibleCount] = useState(0);

  useEffect(() => {
    // Only update prevVisibleCount when:
    // 1. Categories are initially loaded (categories.length changes)
    // 2. When hiding extra categories (going from showAll=true to showAll=false)
    // Don't update when expanding to show all categories to avoid re-animating already visible cards
    if (!showAll || categories.length === 0) {
      setPrevVisibleCount(visibleCount);
    }
  }, [showAll, categories.length, visibleCount]);

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
      {visibleCategories.map((cat, index) => {
        // Determine if this card is newly visible after expanding categories
        const isNewlyVisible = index >= prevVisibleCount;
        // Apply animation only to newly visible cards or on initial load
        const shouldAnimate = categories.length > 0 && (prevVisibleCount === 0 || isNewlyVisible);
        // Calculate delay - for newly visible cards after expansion, start from 0
        const delay = shouldAnimate
          ? `${isNewlyVisible && prevVisibleCount > 0 
              ? (index - prevVisibleCount) * 0.1 
              : index * 0.1}s`
          : '0s';

        return (
          <li key={cat.id} className={styles.item}>
            <div
              style={{
                animationDelay: delay,
                animationFillMode: 'forwards',
                // Skip animation for cards that were already visible
                opacity: shouldAnimate ? 0 : 1,
                transform: shouldAnimate ? 'scale(0.8)' : 'scale(1)'
              }}
              className={shouldAnimate ? styles.animatedCard : ''}
            >
              <CategoryCard
                category={cat.name}
                image={categoryImages[cat.name] || "/images/default.png"}
              />
            </div>
          </li>
        );
      })}
      <li className={`${styles.item} ${styles.allCategoriesCard}`}>
        <div
          style={{
            animationDelay: `${Math.max(0, visibleCategories.length - prevVisibleCount) * 0.1}s`,
            animationFillMode: 'forwards'
          }}
          className={categories.length > 0 ? styles.animatedCard : ''}
        >
          <CategoryCard {...allCategoriesCardProps} />
        </div>
      </li>
    </ul>
  );
};

export default CategoryList;

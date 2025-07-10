import React from "react";
import { Link } from "react-router-dom";
import styles from "./RecipeCategories.module.css";
import { Button } from "@components/ui/index.js";

export const RecipeCategories = () => {
  // Example categories - in a real app, these would likely come from an API
  const categories = [
    { id: 1, name: "Breakfast", image: "breakfast.jpg" },
    { id: 2, name: "Lunch", image: "lunch.jpg" },
    { id: 3, name: "Dinner", image: "dinner.jpg" },
    { id: 4, name: "Desserts", image: "desserts.jpg" },
    { id: 5, name: "Vegetarian", image: "vegetarian.jpg" },
  ];

  return (
    <div>
      <h2>Recipe Categories</h2>
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div key={category.id}>
            <Link to={`/category/${category.id}`}>
              <h3>{category.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCategories;

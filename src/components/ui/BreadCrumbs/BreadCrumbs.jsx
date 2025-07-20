import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./BreadCrumbs.module.css";

/**
 * BreadCrumbs component for navigation
 * @param {Object} props - Component props
 * @param {Array} props.items - Optional array of additional breadcrumb items (excluding home)
 * @param {string} props.className - Optional additional CSS class name
 * @returns {JSX.Element} - Rendered BreadCrumbs component
 */
export const BreadCrumbs = ({ items = [], className = "" }) => {
  const location = useLocation();
  const [recipeName, setRecipeName] = useState("");

  // Fetch recipe name if on recipe details page
  useEffect(() => {
    const fetchRecipeName = async () => {
      if (location.pathname.includes("/recipe-details/")) {
        const recipeId = location.pathname.split("/recipe-details/")[1];
        try {
          const response = await fetch(
            `https://project-team-3-backend-2.onrender.com/api/recipes/${recipeId}`
          );
          if (response.ok) {
            const data = await response.json();
            setRecipeName(data.title);
          }
        } catch (error) {
          console.error("Failed to fetch recipe name:", error);
        }
      }
    };

    fetchRecipeName();
  }, [location.pathname]);

  // Generate breadcrumb items based on the current path
  const getBreadcrumbItems = () => {
    const generatedItems = [];

    // For recipe details page, add the recipe name
    if (location.pathname.includes("/recipe-details/") && recipeName) {
      generatedItems.push({ label: recipeName });
    }

    // For profile pages
    else if (location.pathname.includes("/profile")) {
      generatedItems.push({ label: "Profile" });
    }

    // For add recipe page
    else if (location.pathname === "/add-recipe") {
      generatedItems.push({ label: "Add Recipe" });
    }

    // Combine generated items with any passed items
    return [...generatedItems, ...items];
  };

  // Get the final list of breadcrumb items
  const breadcrumbItems = getBreadcrumbItems();
  return (
    <nav
      className={`${styles.breadcrumbs} ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.homeLink}>
            HOME
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.separator}>/</span>
            {item.path ? (
              <Link to={item.path} className={styles.link}>
                {item.label.toUpperCase()}
              </Link>
            ) : (
              <span className={styles.current}>{item.label.toUpperCase()}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;

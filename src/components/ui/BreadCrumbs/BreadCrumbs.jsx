import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectRecipeName } from '@/redux/slices/breadcrumbsSlice.js';
import styles from './BreadCrumbs.module.css';

/**
 * BreadCrumbs component for navigation
 * @param {Object} props - Component props
 * @param {Array} props.items - Optional array of additional breadcrumb items (excluding home)
 * @param {string} props.className - Optional additional CSS class name
 * @returns {JSX.Element} - Rendered BreadCrumbs component
 */
export const BreadCrumbs = ({ items = [], className = '' }) => {
  const location = useLocation();
  const recipeName = useSelector(selectRecipeName);

  // Generate breadcrumb items based on the current path
  const getBreadcrumbItems = () => {
    const generatedItems = [];

    // For recipe details page, add the recipe name from Redux
    if (location.pathname.includes('/recipe-details/') && recipeName) {
      generatedItems.push({ label: recipeName });
    }

    // For profile pages
    else if (location.pathname.includes('/profile')) {
      generatedItems.push({ label: 'Profile' });
    }

    // For add recipe page
    else if (location.pathname === '/add-recipe') {
      generatedItems.push({ label: 'Add Recipe' });
    }

    // Combine generated items with any passed items
    return [...generatedItems, ...items];
  };

  // Get the final list of breadcrumb items
  const breadcrumbItems = getBreadcrumbItems();
  return (
    <nav className={`${styles.breadcrumbs} ${className}`} aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>Home</Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.separator}>/</span>
            {item.path ? (
              <Link to={item.path} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;

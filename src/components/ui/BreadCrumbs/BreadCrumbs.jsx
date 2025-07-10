import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BreadCrumbs.module.css';

/**
 * BreadCrumbs component for navigation
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of breadcrumb items (excluding home)
 * @param {string} props.className - Optional additional CSS class name
 * @returns {JSX.Element} - Rendered BreadCrumbs component
 */
export const BreadCrumbs = ({ items = [], className = '' }) => {
  return (
    <nav className={`${styles.breadcrumbs} ${className}`} aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>Home</Link>
        </li>

        {items.map((item, index) => (
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

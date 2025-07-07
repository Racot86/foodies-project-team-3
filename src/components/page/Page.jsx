import React from 'react';
import styles from './Page.module.css';

/**
 * Universal Page component that ensures full height for page content
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render inside the page
 * @param {string} [props.className] - Optional additional CSS class name
 * @returns {JSX.Element} - Rendered Page component
 */
function Page({ children, className }) {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      {children}
    </div>
  );
}

export default Page;

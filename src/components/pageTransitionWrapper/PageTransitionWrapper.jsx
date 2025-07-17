import React, { useState, useEffect } from 'react';
import styles from './PageTransitionWrapper.module.css';

const PageTransitionWrapper = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a small delay before showing the content to ensure the CSS transition works
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}>
      {children}
    </div>
  );
};

export default PageTransitionWrapper;

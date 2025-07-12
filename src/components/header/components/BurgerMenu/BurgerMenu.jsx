import React, { useState, useEffect, useRef } from 'react';
import styles from './BurgerMenu.module.css';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [headerWidth, setHeaderWidth] = useState(0);
  const menuRef = useRef(null);

  // Get the header width on mount and window resize
  useEffect(() => {
    const updateHeaderWidth = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderWidth(header.offsetWidth);
      }
    };

    // Initial measurement
    updateHeaderWidth();

    // Update on resize
    window.addEventListener('resize', updateHeaderWidth);
    return () => window.removeEventListener('resize', updateHeaderWidth);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.burgerMenu} ${isOpen ? styles.open : ''}`}
      onClick={handleClick}
      aria-label="Toggle menu"
      role="button"
      tabIndex={0}
      ref={menuRef}
    >
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>

      {isOpen && (
        <div
          className={styles.menuOverlay}
          style={{
            width: headerWidth ? `${headerWidth}px` : '100%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <div
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Close menu"
            role="button"
            tabIndex={0}
          >×</div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;

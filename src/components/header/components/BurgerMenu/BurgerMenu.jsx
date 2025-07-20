import React, { useState, useEffect, useRef } from "react";
import styles from "./BurgerMenu.module.css";
import Logo from "@/components/ui/Logo/Logo";
import { Link } from "react-router-dom";
import PrivateContentArea from "@/components/privateContentArea/PrivateContentArea";

export const BurgerMenu = ({ isWhiteTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [headerWidth, setHeaderWidth] = useState(0);
  const menuRef = useRef(null);

  // Get the header width on mount and window resize
  useEffect(() => {
    const updateHeaderWidth = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderWidth(header.offsetWidth);
      }
    };

    // Initial measurement
    updateHeaderWidth();

    // Update on resize
    window.addEventListener("resize", updateHeaderWidth);
    return () => window.removeEventListener("resize", updateHeaderWidth);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);

    const layout = document.getElementById("layout");
    if (layout) {
      layout.classList.toggle("menu-open", !isOpen);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    const layout = document.getElementById("layout");
    if (layout) {
      layout.classList.remove("menu-open");
    }
  };
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.burgerMenu} ${isOpen ? styles.open : ""} ${
          isWhiteTheme ? styles.black : ""
        }`}
        onClick={handleClick}
        aria-label="Toggle menu"
        role="button"
        tabIndex={0}
        ref={menuRef}
      >
        <div className={`${styles.line} ${isOpen ? styles.black : ""}`}></div>
        <div className={`${styles.line} ${isOpen ? styles.black : ""}`}></div>
        <div className={`${styles.line} ${isOpen ? styles.black : ""}`}></div>
        <div className={`${styles.line} ${isOpen ? styles.black : ""}`}></div>
      </div>

      {isOpen && (
        <div
          className={styles.menuOverlay}
          style={{
            width: headerWidth ? `${headerWidth}px` : "100%",
            left: "50%",
            transform: "translateX(-50%)",
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
          >
            ×
          </div>

          <div className={styles.menuContent}>
            <div className={styles.logoWrapper}>
              <Logo />
            </div>

            <nav className={styles.navLinks}>
              <Link to="/" className={styles.link} onClick={handleClose}>
                HOME
              </Link>
              <PrivateContentArea>
                <Link
                  to="/add-recipe"
                  className={styles.link}
                  onClick={handleClose}
                >
                  ADD RECIPE
                </Link>
              </PrivateContentArea>
            </nav>
            <div className={styles.imagesContainer}>
              <img
                className={styles.imagePanacota}
                srcSet="/images/hero/panacota.webp 1x, /images/hero/panacota@2x.webp 2x, /images/hero/panacota@3x.webp 3x"
                src="/images/hero/panacota.webp"
                alt="Panacota"
                loading="lazy"
              />
              <img
                className={styles.imageRulet}
                srcSet="/images/hero/rulet.webp 1x, /images/hero/rulet@2x.webp 2x, /images/hero/rulet@3x.webp 3x"
                src="/images/hero/rulet.webp"
                alt="Rulet"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;

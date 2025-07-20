import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";
import { FiArrowUpRight } from "react-icons/fi";
/**
 * @param {Object} props
 * @param {string} [props.category]
 * @param {string} [props.image]
 * @param {boolean} [props.isAll]
 * @param {boolean} [props.isActive]
 * @param {function} [props.onClick]
 * @param {boolean} [props.wide]
 */
const CategoryCard = ({
  category,
  image,
  isAll = false,
  isActive,
  onClick,
  wide = false,
}) => {
  const cardRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    //if (isAll) return; // Don't apply scaling effect to "All Categories" card

    const card = cardRef.current;
    if (!card) return;

    // Function to calculate scale and opacity based on position
    const calculateScaleAndOpacity = () => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const viewportHeight = window.innerHeight;

      // Calculate distance from center (normalized between 0 and 1)
      // Use a smaller divisor for smaller screens to make the effect more pronounced
      const divisor = viewportHeight < 768 ? viewportHeight / 3 : viewportHeight / 2;
      const distance = Math.abs(cardCenter - viewportCenter) / divisor;
      const proximity = 1 - Math.min(distance, 1); // 1 when at center, 0 when far

      // Scale between 0.96 (far) and 1.0 (center)
      const minScale = 0.95;
      const maxScale = 1.0;
      const newScale = minScale + ((maxScale - minScale) * proximity);

      // Opacity between 0.2 (far) and 1.0 (center)
      const minOpacity = 0.2;
      const maxOpacity = 1.0;
      const newOpacity = minOpacity + ((maxOpacity - minOpacity) * proximity);

      setScale(newScale);
      setOpacity(newOpacity);
    };

    // Calculate on scroll with throttling to improve performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateScaleAndOpacity();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set up intersection observer to only calculate when card is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          calculateScaleAndOpacity(); // Initial calculation
          window.addEventListener('scroll', handleScroll);
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      },
      { threshold: 0.1 } // Start when 10% of the card is visible
    );

    observer.observe(card);

    // Clean up
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAll]);

  if (isAll) {
    // Calculate final scale and opacity for "All Categories" button - add 0.03 when hovering
    const finalScale = isHovered ? scale + 0.03 : scale;
    const finalOpacity = isHovered ? opacity + 0.03 : opacity;

    return (
      <div
        ref={cardRef}
        className={`${styles.card} ${styles.allCategoriesCard} ${
          isActive ? styles.active : ""
        }`}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-pressed={isActive}
        style={{
          transform: `scale(${finalScale})`,
          transition: 'transform 0.05s ease-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.allCategoriesContent}>
          {isActive ? "HIDE EXTRA" : "ALL CATEGORIES"}
        </div>
      </div>
    );
  }

  // Calculate final scale and opacity - add 0.03 to current values when hovering
  const finalScale = isHovered ? scale + 0.03 : scale;
  const finalOpacity = isHovered ? opacity + 0.03 : opacity;

  return (
    <Link to={`/category/${category}`} className={styles.cardLink}>
      <div
        ref={cardRef}
        className={`${styles.card} ${wide ? styles.cardWide : ""}`}
        data-wide={wide ? "true" : undefined}
        style={{
          transform: `scale(${finalScale})`,
          transition: 'transform 0.05s ease-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={image}
          alt={category}
          className={styles.image}
          loading="lazy"
        />
        {/* Custom overlay with dynamic opacity instead of ::after pseudo-element */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 5, 0.5)',
            opacity: 1 - finalOpacity, // Invert the opacity for more visible effect
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'opacity 0.05s ease-out'
          }}
        />
        <div className={styles.captionRow}>
          <span className={styles.caption}>{category}</span>
          <span className={styles.iconButton} aria-hidden="true">
            <FiArrowUpRight className={styles.icon} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

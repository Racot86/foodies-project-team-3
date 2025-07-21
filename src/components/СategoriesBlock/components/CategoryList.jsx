import React, {useEffect, useRef, useState} from "react";
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
    // Track categories that are being removed with animation
    const [exitingCategories, setExitingCategories] = useState([]);
    // Track previous showAll state to detect transitions
    const prevShowAllRef = useRef(showAll);

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
        // Handle transition from showing all to showing limited categories
        if (prevShowAllRef.current && !showAll) {
            // Get categories that will be hidden
            const hiddenCategories = categories.slice(visibleCount);
            // Set them as exiting to trigger animation
            setExitingCategories(hiddenCategories);

            // Remove exiting categories after animation completes
            const animationDuration = 300; // 0.3s in milliseconds
            const timeoutId = setTimeout(() => {
                setExitingCategories([]);
            }, animationDuration);

            return () => clearTimeout(timeoutId);
        }

        // Update previous showAll state
        prevShowAllRef.current = showAll;

        // Only update prevVisibleCount when:
        // 1. Categories are initially loaded (categories.length changes)
        // 2. When hiding extra categories (going from showAll=true to showAll=false)
        // Don't update when expanding to show all categories to avoid re-animating already visible cards
        if (!showAll || categories.length === 0) {
            setPrevVisibleCount(visibleCount);
        }
    }, [showAll, categories, categories.length, visibleCount]);

    // Determine which categories to show
    const visibleCategories = showAll
        ? categories
        : categories.slice(0, visibleCount);

    // Combine visible categories with exiting categories for rendering
    const renderCategories = [...visibleCategories, ...exitingCategories.filter(
        exitCat => !visibleCategories.some(visCat => visCat.id === exitCat.id)
    )];

    const allCategoriesCardProps = {
        isActive: showAll,
        onClick: () => setShowAll((prev) => !prev),
        isAll: true,
    };

    return (
        <ul className={styles.list}>
            {renderCategories.map((cat, index) => {
                // Check if this category is being removed (in exitingCategories but not in visibleCategories)
                const isExiting = exitingCategories.some(exitCat => exitCat.id === cat.id) &&
                    !visibleCategories.some(visCat => visCat.id === cat.id);

                // For entering categories
                const isNewlyVisible = index >= prevVisibleCount && !isExiting;
                const shouldAnimateEnter = categories.length > 0 && (prevVisibleCount === 0 || isNewlyVisible) && !isExiting;

                // Calculate delay for entrance animation
                const enterDelay = shouldAnimateEnter
                    ? `${isNewlyVisible && prevVisibleCount > 0
                        ? (index - prevVisibleCount) * 0.1
                        : index * 0.1}s`
                    : '0s';

                // Calculate delay for exit animation - reverse order for nice effect
                const exitDelay = isExiting
                    ? `${(exitingCategories.findIndex(exitCat => exitCat.id === cat.id) * 0.05)}s`
                    : '0s';

                return (
                    <li key={cat.id} className={styles.item}>
                        <div
                            style={{
                                animationDelay: isExiting ? exitDelay : enterDelay,
                                animationFillMode: 'forwards',
                                // Initial state depends on animation type
                                opacity: shouldAnimateEnter ? 0 : 1,
                                transform: shouldAnimateEnter ? 'scale(0.8)' : 'scale(1)'
                            }}
                            className={
                                isExiting
                                    ? styles.exitAnimatedCard
                                    : shouldAnimateEnter
                                        ? styles.animatedCard
                                        : ''
                            }
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

import React, {useEffect, useState} from 'react';
import styles from './PageTransitionWrapper.module.css';

/**
 * PageTransitionWrapper component that provides a fade-in transition effect for its children
 *
 * @param {React.ReactNode} children - The content to be wrapped with the transition effect
 * @param {number} [animationSpeed=0.5] - The speed of the transition animation in seconds
 * @returns {JSX.Element} - The wrapped content with transition effect
 */
const PageTransitionWrapper = ({children, animationSpeed = 0.5}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set a small delay before showing the content to ensure the CSS transition works
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 50);

        return () => clearTimeout(timer);
    }, []);

    // Apply custom transition speed using inline style
    const transitionStyle = {
        transition: `opacity ${animationSpeed}s ease-in-out`
    };

    return (
        <div
            className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}
            style={transitionStyle}
        >
            {children}
        </div>
    );
};

export default PageTransitionWrapper;

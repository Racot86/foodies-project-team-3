import React from 'react';
import styles from './RecipeCardSkeleton.module.css';

/**
 * RecipeCardSkeleton component
 * Displays a loading skeleton for recipe cards
 */
const RecipeCardSkeleton = () => {
    return (
        <div className={`${styles.card} ${styles.skeleton}`}>
            {/* Image placeholder */}
            <div className={`${styles.skeletonImage} ${styles.skeletonPulse}`}></div>

            <div className={styles.content}>
                {/* Title and instructions placeholders */}
                <div className={styles.titleContainer}>
                    <div className={`${styles.skeletonTitle} ${styles.skeletonPulse}`}></div>
                    <div className={`${styles.skeletonText} ${styles.skeletonPulse}`}></div>
                    <div className={`${styles.skeletonText} ${styles.skeletonPulse}`}></div>
                </div>

                {/* Footer placeholders */}
                <div className={styles.footer}>
                    {/* Author placeholder */}
                    <div className={styles.author}>
                        <div className={`${styles.skeletonAvatar} ${styles.skeletonPulse}`}></div>
                        <div className={`${styles.skeletonAuthorName} ${styles.skeletonPulse}`}></div>
                    </div>

                    {/* Action buttons placeholders */}
                    <div className={styles.actions}>
                        <div className={`${styles.skeletonButton} ${styles.skeletonPulse}`}></div>
                        <div className={`${styles.skeletonButton} ${styles.skeletonPulse}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCardSkeleton;

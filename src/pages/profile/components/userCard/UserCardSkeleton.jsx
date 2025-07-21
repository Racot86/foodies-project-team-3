import React from 'react';
import styles from './UserCard.module.css';

/**
 * UserCardSkeleton component
 * Displays a loading skeleton for user cards in the following/followers section
 */
const UserCardSkeleton = () => {
  // Create an array of items to display multiple skeleton cards
  const skeletonItems = Array(3).fill(null);

  return (
    <>
      {skeletonItems.map((_, index) => (
        <div key={index} className={`${styles.userCard} ${styles.skeleton}`}>
          <div className={styles.userDetails}>
            {/* Avatar skeleton */}
            <div className={`${styles.avatar} ${styles.skeletonPulse}`}>
              <div className={styles.skeletonAvatar}></div>
            </div>

            <div className={styles.userInfo}>
              {/* User name skeleton */}
              <div className={`${styles.skeletonPulse} ${styles.skeletonUserName}`}></div>

              {/* Recipe count skeleton */}
              <div className={`${styles.skeletonPulse} ${styles.skeletonRecipeCount}`}></div>

              {/* Action button skeleton */}
              <div className={`${styles.skeletonPulse} ${styles.skeletonActionButton}`}></div>
            </div>
          </div>

          {/* Navigation button skeleton */}
          <div className={styles.button}>
            <div className={`${styles.skeletonPulse} ${styles.skeletonIconButton}`}></div>
          </div>

          {/* Divider for all but the last item */}
          {index < skeletonItems.length - 1 && (
            <div className={styles.divider}>
              <div className={`${styles.skeletonPulse} ${styles.skeletonDivider}`}></div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default UserCardSkeleton;

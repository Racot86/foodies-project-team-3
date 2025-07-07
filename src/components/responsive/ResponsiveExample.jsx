import React from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint.js';
import styles from './ResponsiveExample.module.css';

export const ResponsiveExample = () => {
  const { breakpoint, windowWidth } = useBreakpoint();

  return (
    <div className={styles.example}>
      <h2>Responsive Example</h2>
      <p>Current breakpoint: <strong>{breakpoint}</strong></p>
      <p>Window width: <strong>{windowWidth}px</strong></p>

      {/* Conditional rendering based on breakpoint */}
      {breakpoint === 'mobile-small' && (
        <p className={styles.mobileSmall}>Content optimized for very small screens</p>
      )}

      {breakpoint === 'mobile' && (
        <p className={styles.mobile}>Content optimized for mobile</p>
      )}

      {breakpoint === 'tablet' && (
        <p className={styles.tablet}>Content optimized for tablet</p>
      )}

      {breakpoint === 'desktop' && (
        <p className={styles.desktop}>Content optimized for desktop</p>
      )}
    </div>
  );
};

import React from 'react';
import styles from './ResponsiveContainer.module.css';

export const ResponsiveContainer = ({children, className = ''}) => {
    return (
        <div className={`${styles.container} ${className}`}>
            {children}
        </div>
    );
};

import React, { useState } from 'react';
import styles from './CheckBox.module.css';

const CheckBox = ({ active: propActive, onChange }) => {
  const [internalActive, setInternalActive] = useState(false);
  const isControlled = propActive !== undefined;
  const active = isControlled ? propActive : internalActive;

  const handleClick = () => {
    if (!isControlled) {
      setInternalActive((prev) => !prev);
    }
    if (onChange) onChange();
  };

  return (
    <button
      onClick={handleClick}
      aria-pressed={active}
      className={styles.checkbox}
    >
      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 20 20"
          fill="var(--color-white)"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 
              4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 
              001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
};

export default CheckBox;

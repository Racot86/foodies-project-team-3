import React from 'react';

const CheckBox = ({ active, onChange }) => {
  return (
    <button
      onClick={onChange}
      aria-pressed={active}
      style={{
        width: '18px',
        height: '18px',
        borderRadius: '6px',
        border: '1px solid rgba(232, 232, 232, 1)',
        backgroundColor: active ? '#000000' : '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 20 20"
          fill="#ffffff"
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

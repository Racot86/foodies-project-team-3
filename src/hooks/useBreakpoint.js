import { useState, useEffect } from 'react';

// Define breakpoints
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1440
};

export const useBreakpoint = () => {
  // Initialize with a default value
  const [breakpoint, setBreakpoint] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update breakpoint based on window width
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width < breakpoints.mobile) {
        setBreakpoint('mobile-small');
      } else if (width < breakpoints.tablet) {
        setBreakpoint('mobile');
      } else if (width < breakpoints.desktop) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    // Initial call
    updateBreakpoint();

    // Add event listener for window resize
    window.addEventListener('resize', updateBreakpoint);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  return { breakpoint, windowWidth };
};

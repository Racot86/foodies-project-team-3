import {useEffect, useState} from 'react';

// Default breakpoints (will be overridden by CSS variables)
export const defaultBreakpoints = {
    mobile: 375,
    tablet: 768,
    desktop: 1440
};

export const useBreakpoint = () => {
    // Initialize with a default value
    const [breakpoint, setBreakpoint] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Get breakpoints from CSS variables
    const [breakpoints, setBreakpoints] = useState(defaultBreakpoints);

    // Effect to get breakpoints from CSS variables
    useEffect(() => {
        try {
            const computedStyle = getComputedStyle(document.documentElement);
            const mobile = parseInt(computedStyle.getPropertyValue('--container-mobile'));
            const tablet = parseInt(computedStyle.getPropertyValue('--container-tablet'));
            const desktop = parseInt(computedStyle.getPropertyValue('--container-desktop'));

            // Only update if we got valid values
            if (!isNaN(mobile) && !isNaN(tablet) && !isNaN(desktop)) {
                setBreakpoints({
                    mobile,
                    tablet,
                    desktop
                });
            }
        } catch (error) {
            console.error('Error reading CSS variables:', error);
            // Keep using default breakpoints
        }
    }, []);

    // Effect to update breakpoint based on window width
    useEffect(() => {
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
    }, [breakpoints]);

    return {breakpoint, windowWidth};
};

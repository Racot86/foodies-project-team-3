/**
 * Utility functions for device type detection
 */

export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
};

export const getDeviceType = () => {
  if (typeof window === "undefined") {
    return { isMobile: false, isTablet: false, isDesktop: true };
  }

  // Use clientWidth for more accurate measurement (excludes scrollbar)
  const width = document.documentElement.clientWidth || window.innerWidth;

  const isMobile = width < breakpoints.tablet;
  const isTablet = width >= breakpoints.tablet && width < breakpoints.desktop;
  const isDesktop = width >= breakpoints.desktop;

  return {
    isMobile,
    isTablet,
    isDesktop,
    width,
  };
};

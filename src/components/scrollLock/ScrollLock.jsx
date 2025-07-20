import { useEffect } from 'react';
import { useAppSelector } from '@/redux/store';
import { selectIsScrollBlocked } from '@/redux/slices/scrollControlSlice';

/**
 * ScrollLock component that prevents scrolling on the body when certain modals or menus are open
 * This component doesn't render anything visible, it just applies/removes CSS to the body
 */
const ScrollLock = () => {
  const isScrollBlocked = useAppSelector(selectIsScrollBlocked);

  useEffect(() => {
    if (isScrollBlocked) {
      // Save the current scroll position
      const scrollY = window.scrollY;

      // Apply styles to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      // Get the scroll position from the body's top property
      const scrollY = document.body.style.top;

      // Remove the styles that prevent scrolling
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';

      // Restore the scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    // Cleanup function to ensure we remove styles when component unmounts
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isScrollBlocked]);

  // This component doesn't render anything visible
  return null;
};

export default ScrollLock;

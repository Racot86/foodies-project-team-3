import React, { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { authService } from '../../services/authService';
import styles from './PreLoader.module.css';

/**
 * PreLoader component that displays before the main content
 * Checks user authentication and updates localStorage accordingly
 * @param {object} props
 * @param {React.ReactNode} props.children - The main application content to render after loading
 */
const PreLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage] = useState("Be patient, we are cooking site for you");

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Try to get current user data
        const userData = await authService.getCurrentUser();

        // If successful, update the user data in localStorage
        const foodiesData = localStorage.getItem('foodies');
        if (foodiesData) {
          // If foodies data exists, update it
          const parsedData = JSON.parse(foodiesData);
          localStorage.setItem('foodies', JSON.stringify({
            token: parsedData.token, // Preserve existing token
            username: userData.name,
            avatar: userData.avatar || null
          }));
        } else {
          // If no foodies data exists, create it with user data only
          localStorage.setItem('foodies', JSON.stringify({
            token: null, // No token available if creating new entry
            username: userData.name,
            avatar: userData.avatar || null
          }));
        }
      } catch {
        // If authentication fails, update localStorage to match auth slice structure
        // The auth slice removes 'foodies' entirely on authentication failure
        // But we'll follow the same approach as in authSlice.getCurrentUser.rejected
        localStorage.removeItem('foodies');
      } finally {
        // Finish loading regardless of the result
        setIsLoading(false);
      }
    };

    // Start the authentication check
    checkAuthentication();
  }, []);

  // If still loading, show the preloader
  if (isLoading) {
    return (
      <div className={styles.preloaderContainer}>
        <div className={styles.loader}>
          <FiLoader size={50} color="#8BAA36" className={styles.icon} />
        </div>
        <p className={styles.message}>{loadingMessage}</p>
      </div>
    );
  }

  // If loading is complete, render the children (main application)
  return children;
};

export default PreLoader;

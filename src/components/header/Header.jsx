import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "@components/ui/Logo";
// Import AuthTest component for testing authentication
import AuthTest from "./components/AuthTest";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu.jsx";
import { useBreakpoint } from "@/hooks/useBreakpoint.js";


export const Header = () => {
  const { breakpoint } = useBreakpoint();
  const isMobile = breakpoint === 'mobile' || breakpoint === 'mobile-small';

  return (
    <header className={styles.header}>
      <Logo />
      {isMobile ? (
        <BurgerMenu />
      ) : (
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/">Main Page</Link>
            </li>
            <li>
              <Link to="/add-recipe">Add Recipe</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      )}

      {/* AuthTest component for testing authentication - can be commented out when not needed */}
      <AuthTest />
    </header>
  );
};

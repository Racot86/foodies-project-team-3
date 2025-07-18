import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "@components/ui/Logo/Logo.jsx";
import UserBar from "./components/UserBar/UserBar.jsx";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu.jsx";
import { useBreakpoint } from "@/hooks/useBreakpoint.js";
import { SignToggle } from "../ui";
import PrivateContentArea from "../privateContentArea/PrivateContentArea";
import { useAuthRedux } from "@/hooks";


export const Header = () => {
  const location = useLocation();
  const { breakpoint } = useBreakpoint();
  const isMobile = breakpoint === 'mobile' || breakpoint === 'mobile-small';

  const { isAuthenticated } = useAuthRedux();

  const isWhiteHeader =
    location.pathname === '/add-recipe' ||
    location.pathname === '/profile' ||
    location.pathname.includes('profile') ||
    location.pathname.includes('recipe-details');

  return (
    <header className={`${styles.header} ${isWhiteHeader ? styles.whiteTheme : ''}`}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>

      {!isMobile && (
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''} ${isWhiteHeader ? styles.white : ''}`
                }
              >
                HOME
              </NavLink>
            </li>
            <li>
              <PrivateContentArea>
                <NavLink
                  to="/add-recipe"
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''} ${isWhiteHeader ? styles.white : ''}`
                  }
                >
                  ADD RECIPE
                </NavLink>
              </PrivateContentArea>
            </li>
          </ul>
        </nav>
      )}

      <div className={styles.userbarWrapper}>
        {isAuthenticated ? <UserBar /> : <SignToggle />}
        {isMobile && isAuthenticated && (
          <BurgerMenu isWhiteTheme={isWhiteHeader} />
        )}
      </div>
    </header>
  );
};

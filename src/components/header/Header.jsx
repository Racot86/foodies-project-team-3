import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "@components/ui/Logo/Logo.jsx";
import UserBar from "./components/UserBar/UserBar.jsx";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu.jsx";
import { useBreakpoint } from "@/hooks/useBreakpoint.js";
import { SignToggle } from "../ui";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/redux/slices/authSlice";
import PrivateContentArea from "../privateContentArea/PrivateContentArea";


export const Header = () => {
  const { breakpoint } = useBreakpoint();
  const isMobile = breakpoint === 'mobile' || breakpoint === 'mobile-small';

  const isAuth = useSelector(selectIsAuthenticated)

  return (
    <header className={styles.header}>
      <Logo />
      {!isMobile && (
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link  to="/">Home</Link>
            </li>
            <li>
              <PrivateContentArea>
                <Link to="/add-recipe">Add Recipe</Link>
              </PrivateContentArea>
            </li>
          </ul>
        </nav>
      )}
      {isAuth ? <UserBar /> : <SignToggle />}
      {isMobile && (
            <BurgerMenu />
        )}
    </header>
  );
};

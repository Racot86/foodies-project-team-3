import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { SignToggle } from "@components/ui";
import Logo from "@components/ui/Logo";


export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />      
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
      <SignToggle />
    </header>
  );
};




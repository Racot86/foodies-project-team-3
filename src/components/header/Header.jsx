import React from "react";
import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { SignToggle } from "@components/ui";

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.nav}>
           <a className={css.logo} href="./index.html" rel="noopener noreferrer" aria-label="Foodies">
            <svg width="" height="">
              <use href=""></use>
            </svg>
           </a>
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
      </div>
    </header>
  );
};

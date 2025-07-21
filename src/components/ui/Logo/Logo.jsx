import React from "react";
import {Link} from "react-router-dom";
import styles from "./Logo.module.css";


export const Logo = () => {
    return (
        <Link to="/">
            <img
                src="/logo.svg"
                alt="Foodies Logo"
                className={styles.logo}
            />
        </Link>
    );
};

export default Logo;


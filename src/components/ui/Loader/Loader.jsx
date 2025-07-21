import React from "react";
import {FiLoader} from "react-icons/fi";
import styles from "./Loader.module.css";

/**
 * Universal Loader Spinner for Foodies UI-kit
 * @param {object} props
 * @param {string} [props.className]
 * @param {number} [props.size] - icon size in px
 * @param {string} [props.color] - icon color
 */
const Loader = ({className = '', size = 32, color = '#bfbebe'}) => (
    <span className={`${styles.loader} ${className}`}>
    <FiLoader size={size} color={color} className={styles.icon}/>
  </span>
);

export default Loader;

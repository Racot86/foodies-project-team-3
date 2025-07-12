import React from "react";
import clsx from "clsx";
import styles from "./SocialLink.module.css";

/**
 * Кругла соціальна кнопка-лінк.
 * @param {Object} props
 * @param {string} props.to - URL посилання
 * @param {React.ReactNode} props.children - SVG іконка
 * @param {string} [props.className] - додаткові класи
 * @param {string} [props.ariaLabel] - доступність
 */
export const SocialLink = ({ to, children, className, ariaLabel }) => (
  <a
    href={to}
    className={clsx(styles.button, className)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
  >
    {children}
  </a>
);
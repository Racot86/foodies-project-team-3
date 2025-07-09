import React from "react";
import styles from "./SocialLink.module.css";

const SocialLink = ({ to, children }) => (
  <a
    href={to}
    className={styles.link}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default SocialLink;

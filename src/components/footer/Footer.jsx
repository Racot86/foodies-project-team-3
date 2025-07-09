import styles from "./Footer.module.css";
import SocialLink from "../ui/SocialLink/SocialLink";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.logo}>foodies</span>
        <div className={styles.socials}>
          <SocialLink to="https://facebook.com">
            <svg width="20" height="20" className={styles.icon}>
              <use xlinkHref="/sprite.svg#icon-facebook" />
            </svg>
          </SocialLink>
          <SocialLink to="https://instagram.com">
            <svg width="20" height="20">
              <use xlinkHref="/sprite.svg#icon-instagram" />
            </svg>
        </SocialLink>
        <SocialLink to="https://youtube.com">
          <svg width="20" height="20">
            <use xlinkHref="/sprite.svg#icon-youtube" />
          </svg>
        </SocialLink>
        </div>
      <div className={styles.line} />
      <p className={styles.footerText}>
        ©2024, Foodies. All rights reserved
      </p>
      </div>
    </footer>
  );
};

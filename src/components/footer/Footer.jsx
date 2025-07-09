import styles from "./Footer.module.css";
import SocialLink from "../ui/SocialLink/SocialLink";
import sprite from "../../../public/sprite.svg";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.footerText}>Footer</p>
      </div>
    </footer>
  );
};

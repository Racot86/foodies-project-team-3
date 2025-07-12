import styles from "./Footer.module.css";
import { SocialLink } from "../ui/SocialLink/SocialLink";
import {RiInstagramFill} from "react-icons/ri";
import { TfiFacebook } from "react-icons/tfi";
import { FaYoutube } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.footerText}>Footer</p>
      </div>
      <div className={styles.socials}>
        <SocialLink to="https://facebook.com">
          <TfiFacebook size={20} color="#050505"/>
        </SocialLink>
        <SocialLink to="https://instagram.com">
          <RiInstagramFill size={20} color="#050505"/>
        </SocialLink>
        <SocialLink to="https://youtube.com">
          <FaYoutube size={20} color="#050505"/>
        </SocialLink>
      </div>

    </footer>
  );
};
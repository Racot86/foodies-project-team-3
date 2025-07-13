
import styles from "../footer/Footer.module.css";
import { SocialLink } from "../ui/SocialLink/SocialLink";

import {RiInstagramFill} from "react-icons/ri";
import { TfiFacebook } from "react-icons/tfi";
import { FaYoutube } from "react-icons/fa6";
import Logo from "../ui/Logo";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.upperblock}>
        <div className={styles.content}>
        <Logo />
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
        </div>
      <div className={styles.divider} />

      <div className={styles.copyright}>
        ©2024, Foodies. All rights reserved
      </div>

    </footer>
  );
};

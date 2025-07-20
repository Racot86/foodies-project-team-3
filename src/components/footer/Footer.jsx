import styles from "../footer/Footer.module.css";
import { SocialLink } from "../ui/SocialLink/SocialLink";

import { RiInstagramFill } from "react-icons/ri";
import { GrFacebookOption } from "react-icons/gr";
import { FaYoutube } from "react-icons/fa6";
import Logo from "../ui/Logo/Logo.jsx";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.upperblock}>
        <div className={styles.content}>
          <Logo />
        </div>
        <ul className={styles.socials}>
          <li>
            <SocialLink to="https://www.facebook.com/goITclub/">
              <GrFacebookOption size={20} />
            </SocialLink>
          </li>
          <li>
            <SocialLink to="https://www.instagram.com/goitclub/">
              <RiInstagramFill size={20} />
            </SocialLink>
          </li>
          <li>
            <SocialLink to="https://www.youtube.com/c/GoIT">
              <FaYoutube size={20} />
            </SocialLink>
          </li>
        </ul>
      </div>
      <div className={styles.divider} />

      <div className={styles.copyright}>
        ©2024, Foodies. All rights reserved
      </div>
    </footer>
  );
};

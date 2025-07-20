import { Heading, Text } from "@components/ui/index.js";
import QuoteIcon from "@assets/icons/quote.svg?react";
import styles from "./Header.module.css";

const Header = () => (
  <>
    <Text
      variant="body"
      size="md"
      align="center"
      className={styles.testimonialIntroText}
    >
      What our customer say
    </Text>
    <Heading
      level={1}
      size="2xl"
      color="primary"
      align="center"
      weight="bold2"
      className={styles.testimonialHeading}
    >
      Testimonials
    </Heading>
    <div className={styles.quoteIcon}>
      <QuoteIcon />
    </div>
  </>
);

export default Header;

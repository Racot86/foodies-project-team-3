import styles from './TestimonialCard.module.css';
import {Heading, Text} from "@components/ui/index.js";

const TestimonialCard = ({ testimonial }) => {
  if (!testimonial) {
    return (
      <div className={styles.testimonialWrapper}>
        <div className={styles.testimonialText}>No testimonial available</div>
      </div>
    );
  }

  return (
    <div className={styles.testimonialWrapper}>
      <Text size="2xl" className={styles.testimonialTextMargin}>
        {testimonial.testimonial}
      </Text>
      <Heading size="md" weight="bold" align="center" className={styles.author}>{testimonial.username.toUpperCase()}</Heading>
    </div>
  );
};

export default TestimonialCard;

import styles from './TestimonialCard.module.css';
import {Text} from "@components/ui/index.js";

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
      <div className={styles.author}>{testimonial.username.toUpperCase()}</div>
    </div>
  );
};

export default TestimonialCard;

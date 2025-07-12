import styles from './TestimonialCard.module.css';
import QuoteIcon from '../assets/icons/quote.svg?react';



const TestimonialCard = () => {
  return (
    <div className={styles.testimonialWrapper}>
      <div className={styles.topText}>What our customer say</div>
      <div className={styles.title}>TESTIMONIALS</div>
      <div className={styles.quoteIcon}><QuoteIcon /></div>
      <div className={styles.testimonialText}>
        Thank you for the wonderful recipe for feta pasta with tomatoes and basil.
        It turned out to be not only tasty, but also incredibly colorful.
        This has become a favorite family meal!
      </div>
      <div className={styles.author}>LARRY PAGEIM</div>
      <div className={styles.dots}>
        <span className={`${styles.dot} ${styles.active}`}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default TestimonialCard;

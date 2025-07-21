import styles from "./Pagination.module.css";

const Pagination = ({totalSlides, activeIndex, onBulletClick}) => (
    <div className={styles.customPagination}>
        {Array.from({length: totalSlides}).map((_, index) => (
            <button
                key={index}
                className={`${styles.paginationBullet} ${
                    index === activeIndex ? styles.paginationBulletActive : ""
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => onBulletClick(index)}
            />
        ))}
    </div>
);

export default Pagination;

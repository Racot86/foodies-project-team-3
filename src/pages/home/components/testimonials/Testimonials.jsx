import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Testimonials.module.css';
import TestimonialCard from "@components/TestimonialCard/TestimonialCard.jsx";
import { fetchTestimonials, selectTestimonials, selectIsTestimonialsLoading } from '@/redux/slices/testimonialsSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Heading, Text } from "@components/ui/index.js";
import QuoteIcon from '@assets/icons/quote.svg?react';

// Import Swiper styles
import 'swiper/css';

export const Testimonials = () => {
    const dispatch = useDispatch();
    const testimonials = useSelector(selectTestimonials);
    const isLoading = useSelector(selectIsTestimonialsLoading);
    const [activeIndex, setActiveIndex] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className={styles.testimonials}>
                <div className={styles.loadingContainer}>Loading testimonials...</div>
            </div>
        );
    }

    if (!testimonials || testimonials.length === 0) {
        return (
            <div className={styles.testimonials}>
                <div className={styles.testimonialsContainer}>
                    <Text variant="body" size="md" align="center" style={{marginBottom:"16px"}}>What our customer say</Text>
                    <Heading level={1} size="2xl" color="primary" align="center">TESTIMONIALS</Heading>
                    <QuoteIcon className={styles.quoteIcon} />
                    <div className={styles.noTestimonials}>No testimonials available</div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.testimonials}>
            <div className={styles.testimonialsContainer}>
                <Text variant="body" size="md" align="center" style={{marginBottom:"16px"}}>What our customer say</Text>
                <Heading level={1} size="2xl" color="primary" align="center" weight="bold2">TESTIMONIALS</Heading>
                <div className={styles.quoteIcon}><QuoteIcon /></div>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        // when window width is >= mobile (375px)
                        375: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        // when window width is >= tablet (768px)
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 40
                        },
                        // when window width is >= desktop (1440px)
                        1440: {
                            slidesPerView: 1,
                            spaceBetween: 50
                        }
                    }}
                    className={styles.swiper}
                    onInit={(swiper) => setTotalSlides(swiper.slides.length)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <TestimonialCard testimonial={testimonial} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Pagination */}
                <div className={styles.customPagination}>
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.paginationBullet} ${index === activeIndex ? styles.paginationBulletActive : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                            onClick={() => {
                                const swiperInstance = document.querySelector(`.${styles.swiper}`).swiper;
                                if (swiperInstance) {
                                    swiperInstance.slideTo(index);
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;

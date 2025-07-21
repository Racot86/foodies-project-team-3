import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Testimonials.module.css";
import TestimonialCard from "@components/TestimonialCard/TestimonialCard.jsx";
import {fetchTestimonials, selectIsTestimonialsLoading, selectTestimonials,} from "@/redux/slices/testimonialsSlice";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import "swiper/css";
import Header from "./components/header/Header";
import Pagination from "./components/pagination/Pagination";

export const Testimonials = () => {
    const dispatch = useDispatch();
    const testimonials = useSelector(selectTestimonials);
    const isLoading = useSelector(selectIsTestimonialsLoading);

    const [activeIndex, setActiveIndex] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const swiperRef = useRef(null);

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    const handlePaginationClick = (index) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.testimonials}>
                <div className={styles.loadingContainer}>Loading testimonials...</div>
            </div>
        );
    }

    return (
        <div className={styles.testimonials}>
            <div className={styles.testimonialsContainer}>
                <Header/>
                {!testimonials || testimonials.length === 0 ? (
                    <div className={styles.noTestimonials}>No testimonials available</div>
                ) : (
                    <>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                375: {slidesPerView: 1, spaceBetween: 30},
                                768: {slidesPerView: 1, spaceBetween: 40},
                                1440: {slidesPerView: 1, spaceBetween: 50},
                            }}
                            className={styles.swiper}
                            onInit={(swiper) => {
                                swiperRef.current = swiper;
                                setTotalSlides(swiper.slides.length);
                            }}
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        >
                            {testimonials.map((testimonial, index) => (
                                <SwiperSlide key={index}>
                                    <TestimonialCard testimonial={testimonial}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Pagination
                            totalSlides={totalSlides}
                            activeIndex={activeIndex}
                            onBulletClick={handlePaginationClick}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Testimonials;

import React from 'react';
import styles from './Hero.module.css';
import PrivateContentArea from "@components/privateContentArea/PrivateContentArea.jsx";
import { Button } from "@components/ui/Button/Button.jsx";
import { Text } from "@components/ui/Text/Text.jsx";
import { useBreakpoint } from "@/hooks/useBreakpoint.js";

export const Hero = () => {
    const { breakpoint } = useBreakpoint();
    const isMobile = breakpoint === 'mobile' || breakpoint === 'mobile-small';

    return (
        <section className={`${styles.hero} ${isMobile ? styles.mobileHero : ''}`}>
            <div className={styles.heroContent}>
                <h1 className={styles.improveYourCulinaryTalents}>
                    Improve Your Culinary Talents{" "}
                </h1>
                <Text
                    className={styles.amazingRecipes}
                    size={isMobile ? "sm" : "md"}
                    color="white"
                    weight="medium"
                    align="center"
                >
                    Amazing recipes for beginners in the world of cooking, enveloping you in
                    the aromas and tastes of various cuisines.
                </Text>
                <PrivateContentArea>
                    <Button
                        to="/add-recipe"
                        variant={Button.variants.SECONDARY_REVERSED}
                        className={styles.heroButton}
                    >
                        Add recipe
                    </Button>
                </PrivateContentArea>
            </div>
            <div className={styles.imagesContainer}>
                <img
                    className={styles.imagePanacota}
                    srcSet="/images/hero/panacota.webp 1x, /images/hero/panacota@2x.webp 2x, /images/hero/panacota@3x.webp 3x"
                    src="/images/hero/panacota.webp"
                    alt="Panacota"
                    loading="lazy"
                />
                <img
                    className={styles.imageRulet}
                    srcSet="/images/hero/rulet.webp 1x, /images/hero/rulet@2x.webp 2x, /images/hero/rulet@3x.webp 3x"
                    src="/images/hero/rulet.webp"
                    alt="Rulet"
                    loading="lazy"
                />
            </div>
        </section>
    );
};

export default Hero;

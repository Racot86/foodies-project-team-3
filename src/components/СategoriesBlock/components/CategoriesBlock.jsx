import React from "react";
import Heading from "../../ui/Heading/Heading";
import CategoryList from "./CategoryList";
import styles from "./CategoriesBlock.module.css";
import {Text} from "@/components/ui";
import PageTransitionWrapper from "@components/pageTransitionWrapper/PageTransitionWrapper.jsx";

const CategoriesBlock = () => (
    <PageTransitionWrapper>
        <div className={styles.section}>
            <div className={styles.titlesubtitle}>
                <Heading level={1} size="xl" weight="" align="left" className="">
                    Categories
                </Heading>
                <Text size="md" weight="medium" weigh="medium">
                    Discover a limitless world of culinary possibilities and enjoy exquisite
                    recipes that combine taste, style and the warm atmosphere of the
                    kitchen.
                </Text>
            </div>
            <CategoryList/>
        </div>
    </PageTransitionWrapper>
);

export default CategoriesBlock;

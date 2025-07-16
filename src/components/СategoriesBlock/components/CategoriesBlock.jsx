import React from "react";
import  Heading from "../../ui/Heading/Heading";
import CategoryList from "./CategoryList";
import styles from "./CategoriesBlock.module.css";
import { ResponsiveContainer } from "../../container/ResponsiveContainer";

const CategoriesBlock = () => (
  <div className={styles.categoriesContainer}>
    <div className={styles.section}>
      <div className={styles.titleBox}>
        <Heading level={1} size="xl" weight="bold" align="left" className="">
          Categories
        </Heading>
      </div>
      <div className={styles.subtitleBox}>
        <Heading level={2} size="md" weight="regular" color="secondary" align="left" className="">
          Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.
        </Heading>
      </div>
      <CategoryList />
    </div>
  </div>
);

export default CategoriesBlock;


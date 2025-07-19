import React from "react";
import Heading from "../../ui/Heading/Heading";
import CategoryList from "./CategoryList";
import styles from "./CategoriesBlock.module.css";
import { ResponsiveContainer } from "../../container/ResponsiveContainer";

const CategoriesBlock = () => (
  <div className={styles.section}>
    <div className={styles.titlesubtitle}>
      <div className={styles.titleBox}>
        <Heading level={1} size="xl" weight="" align="left" className="">
          Categories
        </Heading>
      </div>
      <div className={styles.subtitleBox}>
        <Heading
          level={2}
          size="xxs"
          weigh=""
          color="secondary"
          align="left"
          className=""
        >
          Discover a limitless world of culinary possibilities and enjoy
          exquisite recipes that combine taste, style and the warm atmosphere of
          the kitchen.
        </Heading>
      </div>
    </div>
    <CategoryList />
  </div>
);

export default CategoriesBlock;

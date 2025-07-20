import React from "react";
import Heading from "../../ui/Heading/Heading";
import CategoryList from "./CategoryList";
import styles from "./CategoriesBlock.module.css";
import { ResponsiveContainer } from "../../container/ResponsiveContainer";
import { Text } from "@/components/ui";

const CategoriesBlock = () => (
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
    <CategoryList />
  </div>
);

export default CategoriesBlock;

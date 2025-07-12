import React from "react";
import styles from "./AddRecipePage.module.css";
import Page from "@components/page/Page";
import { ResponsiveContainer } from "@/components/container/ResponsiveContainer";
import { Heading, Text } from "@/components/ui";
import { ImageUpload } from "@/components/addRecipe/imgLoader/imgLoader";

function AddRecipePage() {
  return (
    <Page className={styles.recipePage}>
      <ResponsiveContainer>
        <Heading level={1} weight="bold" size="xl">
          ADD RECIPE
        </Heading>
        <Text size="md">
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Text>
        <ImageUpload />
      </ResponsiveContainer>
    </Page>
  );
}

export default AddRecipePage;

import styles from "./AddRecipePage.module.css";
import Page from "@components/page/Page";
import { ResponsiveContainer } from "@/components/container/ResponsiveContainer";
import { Heading, Text } from "@/components/ui";
import RecipeForm from "@/components/addRecipe/recipeForm/RecipeForm";

function AddRecipePage() {
  return (
    <Page className={styles.recipePage}>
      <ResponsiveContainer>
        <Heading
          level={1}
          size="xl"
          weight="bold2"
          style={{
            marginBottom: "20px",
          }}
        >
          ADD RECIPE
        </Heading>
        <Text
          size="md"
          className={styles.subtitleRecipe}
          weight="medium"
          style={{
            marginBottom: "40px",
            marginTop: "0",
            lineHeight: "1.5",
            letterSpacing: "-0.02em",
          }}
        >
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Text>
        <RecipeForm />
      </ResponsiveContainer>
    </Page>
  );
}

export default AddRecipePage;

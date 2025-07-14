import styles from "./AddRecipePage.module.css";
import Page from "@components/page/Page";
import { ResponsiveContainer } from "@/components/container/ResponsiveContainer";
import { Heading, Text } from "@/components/ui";
import RecipeForm from "@/components/addRecipe/recipeForm/RecipeForm";

function AddRecipePage() {
  return (
    <Page className={styles.recipePage}>
      <ResponsiveContainer>
        <div className={styles.wrap}>
          <Heading
            level={1}
            size="xl"
            weight="bold2"
            className="recipePageTitle"
          >
            ADD RECIPE
          </Heading>
          <Text size="md" weight="medium" className="recipeText">
            Reveal your culinary art, share your favorite recipe and create
            gastronomic masterpieces with us.
          </Text>
        </div>
        <RecipeForm />
      </ResponsiveContainer>
    </Page>
  );
}

export default AddRecipePage;

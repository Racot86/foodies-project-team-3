import styles from "./AddRecipePage.module.css";
import Page from "@components/page/Page";
import {ResponsiveContainer} from "@/components/container/ResponsiveContainer";
import {Heading, Text} from "@/components/ui";
import RecipeForm from "@/pages/add-recipe/components/RecipeForm/recipeForm";
import PageTransitionWrapper from "@/components/pageTransitionWrapper/PageTransitionWrapper";

function AddRecipePage() {
    return (
        <PageTransitionWrapper>
            <Page className={styles.recipePage}>
                <ResponsiveContainer>
                    <div className={styles.wrap}>
                        <Heading
                            level={1}
                            size="xl"
                            weight="bold2"
                            className={styles.recipePageTitle}
                        >
                            ADD RECIPE
                        </Heading>
                        <Text size="md" weight="medium" className={styles.recipeText}>
                            Reveal your culinary art, share your favorite recipe and create
                            gastronomic masterpieces with us.
                        </Text>
                    </div>
                    <RecipeForm/>
                </ResponsiveContainer>
            </Page>
        </PageTransitionWrapper>
    );
}

export default AddRecipePage;

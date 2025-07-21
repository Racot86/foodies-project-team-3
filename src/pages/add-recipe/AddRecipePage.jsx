import styles from "./AddRecipePage.module.css";
import Page from "@components/page/Page";
import {ResponsiveContainer} from "@/components/container/ResponsiveContainer";
import {Heading, Text} from "@/components/ui";
import RecipeForm from "@/pages/add-recipe/components/RecipeForm/recipeForm";
import PageTransitionWrapper from "@/components/pageTransitionWrapper/PageTransitionWrapper";
import SEO from "@/components/SEO";

function AddRecipePage() {
    // Define add recipe page specific SEO values
    const addRecipeSEO = {
        title: 'Add Recipe',
        description: 'Share your culinary creations with the Foodies community. Add your favorite recipe with ingredients, instructions, and photos.',
        keywords: 'add recipe, share recipe, recipe form, cooking, culinary, food sharing',
        ogTitle: 'Add Your Recipe | Foodies',
        ogDescription: 'Share your culinary creations with the Foodies community. Add your favorite recipe with ingredients, instructions, and photos.',
        ogType: 'website',
        jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Add Recipe | Foodies',
            description: 'Share your culinary creations with the Foodies community. Add your favorite recipe with ingredients, instructions, and photos.',
            url: 'https://foodies-project-team-3.vercel.app/add-recipe'
        }
    };

    return (
        <PageTransitionWrapper>
            <Page className={styles.recipePage}>
                {/* Apply add recipe page specific SEO */}
                <SEO {...addRecipeSEO} />
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

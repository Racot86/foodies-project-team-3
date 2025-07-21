import React, {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./RecipeDetails.module.css";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {
    checkFavoriteStatus,
    fetchRecipeById,
    processRecipeData,
    toggleFavoriteStatus,
} from "@/redux/slices/recipeDetailsSlice";
import PopularRecipes from "@pages/popular-recipes/PopularRecipes.jsx";
import {Loader} from "@/components/ui";
import {toast} from 'react-toastify';
import SEO from "@/components/SEO";
import PrivateContentArea from "@components/privateContentArea/PrivateContentArea.jsx";

export const RecipeDetails = () => {
    const {recipeId} = useParams();
    const token = useSelector((state) => state?.auth?.token);
    const dispatch = useAppDispatch();
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

    // Get recipe details from Redux store
    const {
        isLoading,
        error,
        processedData,
        isFavorite,
        data: recipeData,
    } = useAppSelector((state) => state.recipeDetails);

    const {
        recipe = null,
        categoryName = "",
        author = null,
    } = processedData || {};

    // Generate SEO data based on recipe information
    const recipeSEO = useMemo(() => {
        if (!recipe) return null;

        // Get the full image URL for Open Graph
        const ogImage = recipe.image ?
            (recipe.image.startsWith("http")
                ? recipe.image
                : `https://project-team-3-backend-2.onrender.com${recipe.image}`)
            : '';

        // Create structured data for recipe
        const recipeJsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: recipe.title,
            description: recipe.description || `${recipe.title} recipe`,
            image: ogImage,
            author: author ? {
                '@type': 'Person',
                name: author.name
            } : undefined,
            recipeCategory: categoryName || undefined,
            recipeIngredient: recipe.ingredients?.map(ing => `${ing.measure} ${ing.name}`) || [],
            recipeInstructions: recipe.instructions?.split(/\r\n\r\n/).map(step => ({
                '@type': 'HowToStep',
                text: step.trim()
            })) || [],
            cookTime: recipe.time ? `PT${recipe.time}M` : undefined,
            keywords: `recipe, ${recipe.title}, ${categoryName || 'food'}, cooking`
        };

        return {
            title: recipe.title,
            description: recipe.description || `${recipe.title} recipe with detailed instructions and ingredients`,
            keywords: `recipe, ${recipe.title}, ${categoryName || 'food'}, cooking, ingredients, instructions`,
            ogTitle: `${recipe.title} Recipe | Foodies`,
            ogDescription: recipe.description || `${recipe.title} recipe with detailed instructions and ingredients`,
            ogImage: ogImage,
            ogType: 'article',
            jsonLd: recipeJsonLd
        };
    }, [recipe, author, categoryName]);

    useEffect(() => {
        // Fetch recipe details using Redux action
        dispatch(fetchRecipeById(recipeId));
    }, [recipeId, dispatch]);

    useEffect(() => {
        // Process recipe data only after fetchRecipeById has completed successfully
        if (recipeData) {
            dispatch(processRecipeData());
        }
    }, [dispatch, recipeData]);

    useEffect(() => {
        // Check if recipe is in favorites
        if (recipe && token) {
            dispatch(
                checkFavoriteStatus({recipeId: recipe._id || recipe.id, token})
            );
        }
    }, [recipe, token, dispatch]);

    const handleToggleFavorite = async () => {
        if (!recipe || !token) {
            toast.warning("Please sign in to manage favorites.");
            return;
        }

        const recipeID = recipe._id || recipe.id;
        if (!recipeID) {
            console.error("Recipe ID missing!");
            toast.error("Recipe ID missing!");
            return;
        }

        try {
            setIsFavoriteLoading(true);

            await dispatch(
                toggleFavoriteStatus({
                    recipeId: recipeID,
                    isFavorite,
                    token,
                })
            ).unwrap();

            // Show success toast
            if (isFavorite) {
                toast.success(`"${recipe.title}" removed from favorites`);
            } else {
                toast.success(`"${recipe.title}" added to favorites`);
            }
        } catch (err) {
            console.error('Error updating favorites:', err);
            toast.error(`Failed to update favorites: ${err.message || 'Unknown error'}`);
        } finally {
            setIsFavoriteLoading(false);
        }
    };

    const getFullImageUrl = (imgPath) => {
        if (!imgPath) return "";
        return imgPath.startsWith("http")
            ? imgPath
            : `https://project-team-3-backend-2.onrender.com${imgPath}`;
    };

    // Handle loading state
    if (isLoading) return <Loader/>;

    // Handle error state
    if (error) return <div className={styles.notFound}>Error: {error}</div>;

    // Handle no recipe data
    if (!recipe && !isLoading)
        return <div className={styles.notFound}>Recipe not found</div>;

    return (
        <div className={styles.recipeDetail}>
            {/* Apply recipe-specific SEO if recipe data is available */}
            {recipeSEO && <SEO {...recipeSEO} />}
            <div className={styles.recipeContent}>
                <div className={styles.recipeImageContainer}>
                    {recipe.image ? (
                        <img
                            src={getFullImageUrl(recipe.image)}
                            alt={recipe.title}
                            className={styles.image}
                        />
                    ) : (
                        <div className={styles.imagePlaceholder}>{recipe.title[0]}</div>
                    )}
                </div>

                <div className={styles.allButImage}>
                    <h1 className={styles.recipeName}>{recipe.title}</h1>

                    <div className={styles.recipeCategoryTime}>
                        {categoryName && <p className={styles.category}>{categoryName}</p>}
                        <p className={styles.prepTime}>{recipe.time} min</p>
                    </div>

                    {recipe.description && (
                        <p className={styles.description}>{recipe.description}</p>
                    )}

                    {author && (
                        <div className={styles.authorContainer}>
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className={styles.authorAvatar}
                            />
                            <div className={styles.authorInfo}>
                                <p className={styles.createdBy}>Created by:</p>
                                <p className={styles.authorName}>{author.name}</p>
                            </div>
                        </div>
                    )}

                    {recipe.ingredients?.length > 0 && (
                        <div className={styles.ingredientsSection}>
                            <h2 className={styles.ingredients}>Ingredients</h2>
                            <div className={styles.ingredientsGrid}>
                                {recipe.ingredients.map((ing, index) => (
                                    <div key={index} className={styles.ingredientCard}>
                                        <div className={styles.imageWrapper}>
                                            {ing.image ? (
                                                <img
                                                    src={ing.image}
                                                    alt={ing.name}
                                                    className={styles.ingredientImage}
                                                />
                                            ) : (
                                                <div className={styles.ingredientPlaceholder}>
                                                    {ing.name[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.nameMeasure}>
                                            <p className={styles.ingredientName}>{ing.name}</p>
                                            <p className={styles.ingredientMeasure}>{ing.measure}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.recipeInfo}>
                        <h2 className={styles.ingredients}>RECIPE PREPARATION</h2>
                        {recipe.instructions.split(/\r\n\r\n/).map((paragraph, index) => (
                            <p key={index} className={styles.instructions}>
                                {paragraph.trim()}
                            </p>
                        ))}
                    </div>

                    <div className={styles.favoriteSection}>
                        <PrivateContentArea>
                            <button
                                className={`${styles.favButton} ${
                                    isFavorite ? styles.active : ""
                                }`}
                                onClick={handleToggleFavorite}
                                disabled={isFavoriteLoading}
                            >
                                {isFavoriteLoading ? (
                                    <span className={styles.loaderContainer}>
                  <Loader size={18}/>
                </span>
                                ) : (
                                    isFavorite ? "Remove from favorites" : "Add to favorites"
                                )}
                            </button>
                        </PrivateContentArea>
                    </div>
                </div>
            </div>
            <PopularRecipes/>
        </div>
    );
};

export default RecipeDetails;

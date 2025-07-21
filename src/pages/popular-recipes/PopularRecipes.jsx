import React, {useEffect, useState} from 'react';
import styles from './PopularRecipes.module.css';
import {useSelector} from 'react-redux';
import RecipeCard from '@components/recipeCard/RecipeCard';

const PopularRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state?.auth?.token);

    const fetchExtraRecipes = async () => {
        try {
            const ids = [119, 120];
            const responses = await Promise.all(
                ids.map(id =>
                    fetch(`https://project-team-3-backend-2.onrender.com/api/recipes/${id}`)
                        .then(res => res.ok ? res.json() : null)
                )
            );
            return responses.filter(Boolean);
        } catch (err) {
            console.error('Error fetching extra recipes:', err);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recipesRes, extraRecipes] = await Promise.all([
                    fetch('https://project-team-3-backend-2.onrender.com/api/recipes/popular'),
                    fetchExtraRecipes(),
                ]);

                const recipesData = await recipesRes.json();

                const base = recipesData.recipes || [];
                const baseIds = new Set(base.map(r => r._id || r.id));
                const uniqueExtras = extraRecipes.filter(r => !baseIds.has(r._id || r.id));

                const combined = [...base, ...uniqueExtras];
                const valid = combined.filter(
                    (recipe) => recipe.title && recipe.image && recipe.owner?.name
                );

                setRecipes(valid);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const selectedRecipes = recipes.slice(0, 4);

    if (loading) return <p>Loading popular recipes...</p>;
    if (selectedRecipes.length === 0) return <p>No recipes found</p>;

    return (
        <section className={styles['popular-recipes']}>
            <h2 className={styles['section-title']}>Popular Recipes</h2>
            <div className={styles['recipes-grid']}>
                {selectedRecipes.map((recipe) => {
                    const id = recipe._id || recipe.id;

                    // Format the recipe object to match RecipeCard's expected props
                    const formattedRecipe = {
                        id: id,
                        title: recipe.title,
                        instructions: recipe.instructions || '',
                        image: recipe.image,
                        owner: {
                            id: recipe.owner?._id || recipe.owner?.id,
                            name: recipe.owner?.name || 'Unknown',
                            avatar: recipe.owner?.avatar
                        }
                    };

                    return (
                        <div key={id} className={styles['recipe-card']}>
                            <RecipeCard recipe={formattedRecipe}/>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PopularRecipes;

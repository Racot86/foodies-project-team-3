import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.css';

export const RecipeDetails = () => {
    const { recipeId } = useParams();

    // Example recipes data - in a real app, this would come from an API
    const recipes = [
        {id: '101', categoryId: 1, title: 'Fluffy Pancakes', time: '20 min', ingredients: ['2 cups flour', '2 eggs', '1 cup milk', '2 tbsp sugar', '1 tsp baking powder'], instructions: 'Mix all ingredients. Heat a pan and pour batter. Flip when bubbles form. Serve with maple syrup.'},
        {id: '102', categoryId: 1, title: 'Avocado Toast', time: '10 min', ingredients: ['2 slices bread', '1 avocado', 'Salt and pepper', 'Red pepper flakes'], instructions: 'Toast bread. Mash avocado and spread on toast. Season with salt, pepper, and red pepper flakes.'},
        {id: '103', categoryId: 1, title: 'Breakfast Burrito', time: '25 min', ingredients: ['2 eggs', '1 tortilla', '1/4 cup cheese', 'Salsa', 'Avocado'], instructions: 'Scramble eggs. Warm tortilla. Add eggs, cheese, salsa, and avocado. Roll up and serve.'},
        {id: '201', categoryId: 2, title: 'Caesar Salad', time: '15 min', ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan cheese', 'Caesar dressing'], instructions: 'Chop lettuce. Toss with dressing. Add croutons and cheese.'},
        {id: '202', categoryId: 2, title: 'Chicken Wrap', time: '20 min', ingredients: ['Grilled chicken', 'Tortilla', 'Lettuce', 'Tomato', 'Mayo'], instructions: 'Grill chicken. Warm tortilla. Add chicken and veggies. Roll up and serve.'},
        {id: '301', categoryId: 3, title: 'Spaghetti Bolognese', time: '45 min', ingredients: ['Spaghetti', 'Ground beef', 'Tomato sauce', 'Onion', 'Garlic'], instructions: 'Cook pasta. Brown beef with onion and garlic. Add sauce. Simmer. Serve over pasta.'},
        {id: '302', categoryId: 3, title: 'Roast Chicken', time: '90 min', ingredients: ['Whole chicken', 'Butter', 'Herbs', 'Salt and pepper', 'Lemon'], instructions: 'Preheat oven to 375°F. Season chicken. Roast for 1.5 hours or until internal temperature reaches 165°F.'},
        {id: '401', categoryId: 4, title: 'Chocolate Cake', time: '60 min', ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Eggs', 'Butter', 'Milk'], instructions: 'Mix dry ingredients. Add wet ingredients. Bake at 350°F for 30-35 minutes.'},
        {id: '501', categoryId: 5, title: 'Vegetable Stir Fry', time: '30 min', ingredients: ['Mixed vegetables', 'Tofu', 'Soy sauce', 'Ginger', 'Garlic'], instructions: 'Stir fry vegetables and tofu. Add sauce ingredients. Serve over rice.'},
    ];

    const recipe = recipes.find(r => r.id === recipeId);

    if (!recipe) {
        return <div className={styles.notFound}>Recipe not found</div>;
    }

    return (
        <div className={styles.recipeDetail}>
            <div className={styles.backLinkContainer}>
                <Link to={`/category/${recipe.categoryId}`} className={styles.backLink}>
                    &larr; Back to Category
                </Link>
            </div>

            <h1>{recipe.title}</h1>
            <p className={styles.prepTime}>Preparation time: {recipe.time}</p>

            <div className={styles.recipeContent}>
                <div className={styles.recipeImageContainer}>
                    {/* Placeholder for recipe image */}
                    <div className={styles.imagePlaceholder}>{recipe.title[0]}</div>
                </div>

                <div className={styles.recipeInfo}>
                    <h2>Ingredients</h2>
                    <ul className={styles.ingredientsList}>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>

                    <h2>Instructions</h2>
                    <p className={styles.instructions}>{recipe.instructions}</p>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;

import React from 'react';
import {Link, useParams} from 'react-router-dom';
import styles from './RecipeCategoryDetails.module.css';

export const RecipeCategoryDetails = () => {
    const {categoryId} = useParams();

    // Example categories data - in a real app, this would come from an API
    const categories = {
        1: {id: 1, name: 'Breakfast', description: 'Start your day with these delicious breakfast recipes.'},
        2: {id: 2, name: 'Lunch', description: 'Perfect meals for your midday break.'},
        3: {id: 3, name: 'Dinner', description: 'Hearty and satisfying dinner recipes for the whole family.'},
        4: {id: 4, name: 'Desserts', description: 'Sweet treats to end your meal on a high note.'},
        5: {id: 5, name: 'Vegetarian', description: 'Delicious meat-free recipes packed with flavor.'},
    };

    // Example recipes data - in a real app, this would be filtered based on the category
    const recipes = [
        {id: 101, categoryId: 1, title: 'Fluffy Pancakes', time: '20 min'},
        {id: 102, categoryId: 1, title: 'Avocado Toast', time: '10 min'},
        {id: 103, categoryId: 1, title: 'Breakfast Burrito', time: '25 min'},
        {id: 201, categoryId: 2, title: 'Caesar Salad', time: '15 min'},
        {id: 202, categoryId: 2, title: 'Chicken Wrap', time: '20 min'},
        {id: 301, categoryId: 3, title: 'Spaghetti Bolognese', time: '45 min'},
        {id: 302, categoryId: 3, title: 'Roast Chicken', time: '90 min'},
        {id: 401, categoryId: 4, title: 'Chocolate Cake', time: '60 min'},
        {id: 501, categoryId: 5, title: 'Vegetable Stir Fry', time: '30 min'},
    ];

    const category = categories[categoryId];
    const categoryRecipes = recipes.filter(recipe => recipe.categoryId === parseInt(categoryId));

    if (!category) {
        return <div className={styles.notFound}>Category not found</div>;
    }

    return (
        <div className={styles.categoryDetail}>
            <div className={styles.backLinkContainer}>
                <Link to="/" className={styles.backLink}>
                    &larr; Back to Categories
                </Link>
            </div>
            <h1>{category.name} Recipes</h1>
            <p className={styles.description}>{category.description}</p>

            <div className={styles.recipesList}>
                {categoryRecipes.length > 0 ? (
                    categoryRecipes.map(recipe => (
                        <div key={recipe.id} className={styles.recipeCard}>
                            <div className={styles.recipeImage}>
                                {/* Placeholder for recipe image */}
                                <div className={styles.imagePlaceholder}>{recipe.title[0]}</div>
                            </div>
                            <div className={styles.recipeInfo}>
                                <h3>{recipe.title}</h3>
                                <p>Preparation time: {recipe.time}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default RecipeCategoryDetails;

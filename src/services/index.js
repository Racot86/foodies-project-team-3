// Export all services from this file for easier imports
export { default as api } from "./api";
export { authService } from "./authService";
export { areasService } from "./areasService";
export { categoriesService } from "./categoriesService";
export { ingredientsService } from "./ingredientsService";
export { addRecipeService } from "./addRecipeService";
export { getRecipeById, addToFavorites, removeFromFavorites } from "./recipeService";

export { followerService } from "./followerService";

export { getMyRecipe, deleteRecipeById } from "./myRecipeService";


import api from "./api.js";

/**
 * Adds a recipe to the user's favorites
 * @param {string|number} id - Recipe ID to add to favorites
 * @returns {Promise<{id: number}>} Object containing the ID of the favorited recipe
 */
export const addToFavorites = async (id) => {
    return api.post(`/recipes/${id}/favorites`);
};

/**
 * Removes a recipe from the user's favorites
 * @param {string|number} id - Recipe ID to remove from favorites
 * @returns {Promise<{id: number}>} Object containing the ID of the unfavorited recipe
 */
export const removeFromFavorites = async (id) => {
    return api.delete(`/recipes/${id}/favorites`);
};

/**
 * Fetches all favorite recipes for the current user
 * @returns {Promise<{recipes: Array}>} Object containing an array of favorite recipes
 */
export const getFavorites = async () => {
    return api.get("/recipes/myfavorites");
};

/**
 * Checks if a recipe is in the user's favorites
 * @param {string|number} id - Recipe ID to check
 * @returns {Promise<boolean>} True if the recipe is in favorites, false otherwise
 */
export const isRecipeInFavorites = async (id) => {
    try {
        const response = await api.get("/recipes/myfavorites");
        // The response structure is { recipes: [...] }
        const favorites = response.recipes || [];
        return favorites.some((favorite) => (favorite.id === id || favorite._id === id));
    } catch (error) {
        console.error("API Error:", error);
        throw new Error(
            error.response?.data?.message ||
            "An error occurred while checking favorites"
        );
    }
};

export const favoritesService = {
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    isRecipeInFavorites,
};

import api from "./api";

export const getMyRecipe = async () => {
  return api.get("/recipes/myrecipes");
};

/**
 * Deletes a recipe by its ID
 * @param {string} recipeId - The ID of the recipe to delete
 * @returns {Promise} Server response
 */
export const deleteRecipeById = async (recipeId) => {
  try {
    const response = await api.delete(`/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete recipe:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete the recipe"
    );
  }
};

import axios from "axios";
import { BASE_URL, DEFAULT_AVATAR } from "./api";

/**
 * Fetches all recipes
 * @returns {Promise<Array>} Array of recipe objects
 */
export const getAllRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching recipes"
    );
  }
};

/**
 * Fetches recipes by category
 * @param {string} categoryName - The name of the category
 * @param {Object} options - Additional options for the request
 * @param {number} [options.page=1] - Page number for pagination
 * @param {number} [options.limit=9] - Number of recipes per page
 * @param {string} [options.area=''] - Area filter (empty string for all areas)
 * @returns {Promise<Object>} Object containing recipes array and total count
 */
export const getRecipesByCategory = async (
  categoryName,
  options = { page: 1, limit: 9, area: "" }
) => {
  try {
    const { page = 1, limit = 9, area = "" } = options;

    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("page", String(page));
    queryParams.append("limit", String(limit));

    // Only append area if it's not empty
    if (area && area.trim() !== "") {
      queryParams.append("area", area);
    }

    queryParams.append("category", categoryName);

    const url = `${BASE_URL}/recipes?${queryParams.toString()}`;
    console.log("Fetching recipes from:", url);
    const response = await axios.get(url);

    // Transform API response to match the format expected by RecipeCard
    const rawData = response.data;

    // Check if we have a valid response with recipes
    if (!rawData) {
      return { recipes: [], total: 0 };
    }

    const recipesArray = Array.isArray(rawData)
      ? rawData
      : rawData.recipes || [];

    // Extract recipes and transform them if needed
    const recipes = recipesArray.map((recipe) => ({
      id: recipe.id || recipe._id,
      title: recipe.title || recipe.name || "Untitled Recipe",
      instructions: recipe.instructions || recipe.description || "",
      image:
        recipe.image ||
        recipe.thumb ||
        "https://via.placeholder.com/300x200?text=No+Image",
      owner: {
        name: recipe.owner?.name || "Unknown Chef",
        avatar: recipe.owner?.avatar || DEFAULT_AVATAR,
      },
      // Preserve area information for filtering
      area: recipe.area
        ? {
            id: recipe.area.id || recipe.area._id,
            name: recipe.area.name,
          }
        : null,
    }));

    // Return formatted data with recipes and total count
    return {
      recipes,
      total: rawData.total || recipesArray.length || recipes.length,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching recipes by category"
    );
  }
};

/**
 * Fetches a recipe by ID
 * @param {string} id - The ID of the recipe
 * @returns {Promise<Object>} Recipe object
 */
export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching recipe details"
    );
  }
};

/**
 * Adds a recipe to favorites
 * @param {string} recipeId - The ID of the recipe to add to favorites
 * @returns {Promise<Object>} Response object
 */
export const addToFavorites = async (recipeId) => {
  try {
    const response = await axios.post(`${BASE_URL}/favorites`, { recipeId });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding recipe to favorites"
    );
  }
};

/**
 * Removes a recipe from favorites
 * @param {string} recipeId - The ID of the recipe to remove from favorites
 * @returns {Promise<Object>} Response object
 */
export const removeFromFavorites = async (recipeId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/recipes/${recipeId}/myfavorites`
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while removing recipe from favorites"
    );
  }
};

/**
 * Checks if a recipe is in favorites
 * @param {string} recipeId - The ID of the recipe to check
 * @returns {Promise<boolean>} True if recipe is in favorites, false otherwise
 */
export const isRecipeInFavorites = async (recipeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/myfavorites`);
    return response.data.some((favorite) => favorite.id === recipeId);
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while checking favorites"
    );
  }
};

/**
 * Fetches areas that have recipes in a specific category
 * @param {string} categoryId - The ID or name of the category
 * @returns {Promise<Array>} Array of area objects with recipes in the category
 */
export const getAreasByCategory = async (categoryId) => {
  try {
    // First, fetch all recipes in the category to see which areas they belong to
    const recipesResponse = await getRecipesByCategory(categoryId, {
      limit: 100,
    });

    // Then fetch all available areas
    const areasResponse = await axios.get(`${BASE_URL}/areas`);
    const allAreas = areasResponse.data;

    if (!Array.isArray(allAreas)) {
      console.error("Unexpected areas response format:", allAreas);
      return [];
    }

    // Extract unique area IDs from recipes in this category
    const recipes = recipesResponse.recipes || [];
    const categoryAreaIds = new Set();

    recipes.forEach((recipe) => {
      // Check if the recipe has area information
      if (recipe.area && (recipe.area.id || recipe.area._id)) {
        categoryAreaIds.add(recipe.area.id || recipe.area._id);
      }
    });

    // Filter areas to only those that have recipes in this category
    const filteredAreas = allAreas.filter((area) =>
      categoryAreaIds.has(area.id || area._id)
    );

    return filteredAreas;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching areas by category"
    );
  }
};

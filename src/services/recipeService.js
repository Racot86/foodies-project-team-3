import axios from "axios";
import { BASE_URL, DEFAULT_AVATAR } from "./api";

import api from "./api";

/**
 * Fetches recipes with filtering and pagination
 * @param {Object} options - Options for filtering and pagination
 * @param {string} [options.category=''] - Category filter (empty string for all categories)
 * @param {string} [options.ingredient=''] - Ingredient filter (empty string for all ingredients)
 * @param {string} [options.area=''] - Area filter (empty string for all areas)
 * @param {string} [options.ownerId=''] - Owner ID filter (empty string for all owners)
 * @param {number} [options.page=1] - Page number for pagination
 * @param {number} [options.limit=10] - Number of recipes per page
 * @param {string} [options.sort=''] - Sort parameter (e.g., 'newest', 'oldest', 'popular')
 * @returns {Promise<Object>} Object containing recipes array, total count, and pagination info
 */
export const getRecipes = async (
  options = { category: '', ingredient: '', area: '', ownerId: '', page: 1, limit: 10, sort: '' }
) => {
  try {
    const { category = '', ingredient = '', area = '', ownerId = '', page = 1, limit = 10, sort = '' } = options;

    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("page", String(page));
    queryParams.append("limit", String(limit));

    // Add filters if they are provided
    if (category !== null && category !== undefined && category !== '') {
      queryParams.append("category", category);
    }

    if (ingredient !== null && ingredient !== undefined && ingredient !== '') {
      queryParams.append("ingredient", ingredient);
    }

    if (area !== null && area !== undefined && area !== '') {
      queryParams.append("area", area);
    }

    if (ownerId !== null && ownerId !== undefined && ownerId !== '') {
      queryParams.append("ownerId", ownerId);
    }

    if (sort !== null && sort !== undefined && sort !== '') {
      queryParams.append("sort", sort);
    }

    const url = `${BASE_URL}/recipes?${queryParams.toString()}`;

    const response = await axios.get(url);

    // Transform API response to match the format expected by RecipeCard
    const rawData = response.data;

    // Check if we have a valid response with recipes
    if (!rawData) {
      return { recipes: [], total: 0, totalPages: 0, page, limit };
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
      // Preserve category information
      category: recipe.category
        ? {
            id: recipe.category.id || recipe.category._id,
            name: recipe.category.name,
            description: recipe.category.description || "",
          }
        : null,
      // Preserve ingredients information if available
      ingredients: recipe.ingredients || [],
    }));

    // Return formatted data with recipes, total count, and pagination info
    return {
      recipes,
      total: rawData.total || recipesArray.length || recipes.length,
      totalPages: rawData.totalPages || Math.ceil((rawData.total || recipesArray.length || recipes.length) / limit),
      page,
      limit
    };
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching recipes"
    );
  }
};

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
 * @param {string} [options.ingredient=''] - Ingredient filter (empty string for all ingredients)
 * @param {string} [options.sort=''] - Sort parameter (e.g., 'newest', 'oldest', 'popular')
 * @param {string} [options.ownerId=''] - Owner ID filter (empty string for all owners)
 * @returns {Promise<Object>} Object containing recipes array and total count
 */
export const getRecipesByCategory = async (
  categoryName,
  options = { page: 1, limit: 9, area: "", ingredient: "", sort: "", ownerId: "" }
) => {
  try {
    const { page = 1, limit = 9, area = "", ingredient = "", sort = "", ownerId = "" } = options;

    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("page", String(page));
    queryParams.append("limit", String(limit));

    // Always append area, even if it's empty
    if (area !== null && area !== undefined) {
      queryParams.append("area", area);
    }

    // Always append ingredient, even if it's empty
    if (ingredient !== null && ingredient !== undefined) {
      queryParams.append("ingredient", ingredient);
    }

    // Always append sort, even if it's empty
    if (sort !== null && sort !== undefined) {
      queryParams.append("sort", sort);
    }

    // Always append ownerId, even if it's empty
    if (ownerId !== null && ownerId !== undefined) {
      queryParams.append("ownerId", ownerId);
    }

    queryParams.append("category", categoryName);

    const url = `${BASE_URL}/recipes?${queryParams.toString()}`;
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
      // Preserve category information
      category: recipe.category
        ? {
            id: recipe.category.id || recipe.category._id,
            name: recipe.category.name,
            description: recipe.category.description || "",
          }
        : null,
      // Preserve ingredients information if available
      ingredients: recipe.ingredients || [],
    }));

    // Extract category information from the first recipe if available
    let categoryInfo = null;
    if (recipes.length > 0 && recipes[0].category) {
      categoryInfo = recipes[0].category;
    }

    // Return formatted data with recipes, total count, totalPages, and category info
    return {
      recipes,
      total: rawData.total || recipesArray.length || recipes.length,
      totalPages: rawData.totalPages || Math.ceil((rawData.total || recipesArray.length || recipes.length) / (options.limit || 9)),
      category: categoryInfo || { name: categoryName, description: `Recipes from the ${categoryName} category.` },
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
    const response = await api.post(`/recipes/${recipeId}/favorites`);
    return response;
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
  const response = await api.delete(`/recipes/${recipeId}/favorites`);
  return response.data;
};

/**
 * Checks if a recipe is in favorites
 * @param {string} recipeId - The ID of the recipe to check
 * @returns {Promise<boolean>} True if recipe is in favorites, false otherwise
 */
export const isRecipeInFavorites = async (recipeId) => {
  try {
    const response = await api.get("/recipes/myfavorites");
    // The response structure is { recipes: [...] }
    const favorites = response.recipes || [];
    return favorites.some((favorite) => (favorite.id === recipeId || favorite._id === recipeId));
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

export const getFavorites = async () => {
  const response = await api.get("/recipes/myfavorites");
  // Return the entire response which has the structure { recipes: [...] }
  return response;
};

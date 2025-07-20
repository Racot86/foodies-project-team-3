import api from "./api.js";

/**
 * Fetches recipes with optional filtering and pagination
 * @param {Object} options - Filter and pagination options
 * @param {string} [options.category] - Filter by category name
 * @param {string} [options.ingredient] - Filter by ingredient name
 * @param {string} [options.area] - Filter by area name
 * @param {string} [options.title] - Filter by recipe title
 * @param {string} [options.ownerId] - Filter by owner ID (preferred)
 * @param {string} [options.owner] - Filter by owner ID (legacy, use ownerId instead)
 * @param {number} [options.page=1] - Page number for pagination
 * @param {number} [options.limit=10] - Number of recipes per page
 * @returns {Promise<{
 *   total: number,
 *   totalPages: number,
 *   page: number,
 *   limit: number,
 *   recipes: Array<{
 *     id: number,
 *     title: string,
 *     category: {id: number, name: string},
 *     instructions: string,
 *     description: string,
 *     image: string,
 *     time: string,
 *     owner: {id: number, name: string, avatar: string|null, email: string},
 *     ingredients: Array<{
 *       ingredient: {
 *         id: number,
 *         name: string,
 *         description: string,
 *         image: string
 *       },
 *       measure: string
 *     }>,
 *     area: {id: number, name: string}
 *   }>
 * }>} Response with pagination info and recipes array
 */
export const getRecipes = async (options = {}) => {
  const {
    category,
    ingredient,
    area,
    title,
    owner,
    ownerId,
    page = 1,
    limit = 10
  } = options;

  // Build query parameters
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  // Use 'ingridient' (with typo) as the parameter name to match the backend API
  // The backend expects 'ingridient' not 'ingredient'
  if (ingredient) params.append('ingridient', ingredient);
  if (area) params.append('area', area);
  if (title) params.append('title', title);
  if (ownerId) params.append('ownerId', ownerId);
  else if (owner) params.append('ownerId', owner);
  if (page) params.append('page', page);
  if (limit) params.append('limit', limit);

  const queryString = params.toString();
  const url = queryString ? `/recipes?${queryString}` : '/recipes';

  return api.get(url);
};

/**
 * Fetches a single recipe by ID
 * @param {number} id - Recipe ID
 * @returns {Promise<{
 *   id: number,
 *   title: string,
 *   category: {id: number, name: string},
 *   instructions: string,
 *   description: string,
 *   image: string,
 *   time: string,
 *   owner: {id: number, name: string, avatar: string|null, email: string},
 *   ingredients: Array<{
 *     ingredient: {
 *       id: number,
 *       name: string,
 *       description: string,
 *       image: string
 *     },
 *     measure: string
 *   }>,
 *   area: {id: number, name: string}
 * }>} Recipe object
 */
export const getRecipeById = async (id) => {
  return api.get(`/recipes/${id}`);
};

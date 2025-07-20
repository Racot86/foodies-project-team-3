import api from "./api";

export const areasService = async (filters = {}) => {
  const { category, ingredient, assignedToRecipes } = filters;

  // Build query parameters
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  // Use 'ingridient' (with typo) as the parameter name to match the backend API
  // The issue description shows the backend expects 'ingridient' not 'ingredient'
  if (ingredient) params.append('ingridient', ingredient);
  if (assignedToRecipes) params.append('assignedToRecipes', assignedToRecipes);

  const queryString = params.toString();
  const url = queryString ? `/areas?${queryString}` : '/areas';

  return api.get(url);
};

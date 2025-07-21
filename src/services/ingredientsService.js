import api from "./api";

export const ingredientsService = async (filters = {}) => {
    const {category, area, assignedToRecipes} = filters;

    // Fix typo in parameter name (ingridient -> ingredient)
    // The backend expects 'ingredient' but the issue description shows 'ingridient'

    // Build query parameters
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (area) params.append('area', area);
    if (assignedToRecipes) params.append('assignedToRecipes', assignedToRecipes);

    const queryString = params.toString();
    const url = queryString ? `/ingredients?${queryString}` : '/ingredients';

    return api.get(url);
};

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addToFavorites, categoriesService, getRecipeById, ingredientsService, removeFromFavorites} from "@/services";

// Fetch recipe by ID
export const fetchRecipeById = createAsyncThunk(
    "recipeDetails/fetchById",
    async (id, {rejectWithValue}) => {
        try {
            return await getRecipeById(id);
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch recipe details");
        }
    }
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
    "recipeDetails/fetchCategories",
    async (_, {rejectWithValue}) => {
        try {
            return await categoriesService();
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch categories");
        }
    }
);

// Fetch ingredients
export const fetchIngredients = createAsyncThunk(
    "recipeDetails/fetchIngredients",
    async (_, {rejectWithValue}) => {
        try {
            return await ingredientsService({filter: false});
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch ingredients");
        }
    }
);

// Check if recipe is in favorites
export const checkFavoriteStatus = createAsyncThunk(
    "recipeDetails/checkFavoriteStatus",
    async ({recipeId, token}, {rejectWithValue}) => {
        try {
            if (!token) return false;

            const response = await fetch('https://project-team-3-backend-2.onrender.com/api/recipes/myfavorites', {
                headers: {Authorization: `Bearer ${token}`},
            });

            if (!response.ok) {
                throw new Error('Failed to fetch favorites');
            }

            const favData = await response.json();
            // The response structure is { recipes: [...] }
            const favorites = favData?.recipes || [];
            return favorites.some(
                (fav) => fav._id === recipeId || fav.id === recipeId
            );
        } catch (error) {
            return rejectWithValue(error.message || "Failed to check favorite status");
        }
    }
);

// Toggle favorite status
export const toggleFavoriteStatus = createAsyncThunk(
    "recipeDetails/toggleFavoriteStatus",
    async ({recipeId, isFavorite, token}, {rejectWithValue}) => {
        try {
            if (!token) {
                return rejectWithValue("Authentication required");
            }

            if (isFavorite) {
                await removeFromFavorites(recipeId);
                return false;
            } else {
                await addToFavorites(recipeId);
                return true;
            }
        } catch (error) {
            return rejectWithValue(error.message || "Failed to toggle favorite status");
        }
    }
);

// Process recipe data with categories and ingredients
export const processRecipeData = createAsyncThunk(
    "recipeDetails/processRecipeData",
    async (_, {getState, rejectWithValue}) => {
        try {
            const {recipeDetails} = getState();
            const recipeData = recipeDetails.data;

            if (!recipeData) {
                return null;
            }

            // Fetch categories
            const catsRes = await fetch('https://project-team-3-backend-2.onrender.com/api/categories');
            const cats = await catsRes.json();
            const foundCategory = cats.find((c) => c.name === recipeData.category?.name || c._id === recipeData.category?.id);
            const categoryName = foundCategory ? foundCategory.name : '';

            // Fetch ingredients
            const ingRes = await fetch('https://project-team-3-backend-2.onrender.com/api/ingredients');
            const allIngredients = await ingRes.json();
            const enrichedIngredients = recipeData.ingredients.map((item) => {
                const idToMatch = item.id || item.ingredient?.id;
                const full = allIngredients.find((ing) => ing._id === idToMatch);
                return {
                    ...item,
                    name: full?.name || item.ingredient?.name || 'Unknown',
                    image: full?.thumb || item.ingredient?.image || '',
                };
            });

            // Set author
            const author = {
                name: recipeData.owner?.name || 'Unknown Author',
                avatar: processAvatarUrl(recipeData.owner?.avatar) || '/default-avatar.jpg',
            };

            // Helper function to process avatar URL
            function processAvatarUrl(imgPath) {
                if (!imgPath) return '';
                return imgPath.startsWith('http')
                    ? imgPath
                    : `https://project-team-3-backend-2.onrender.com${imgPath}`;
            }

            return {
                recipe: {
                    ...recipeData,
                    _id: recipeData._id || recipeData.id,
                    ingredients: enrichedIngredients
                },
                categoryName,
                author
            };
        } catch (error) {
            return rejectWithValue(error.message || "Failed to process recipe data");
        }
    }
);

const recipeDetailsSlice = createSlice({
    name: "recipeDetails",
    initialState: {
        data: null,
        processedData: {
            recipe: null,
            categoryName: '',
            author: null
        },
        categories: [],
        ingredients: [],
        isFavorite: false,
        isLoading: false,
        isProcessing: false,
        error: null,
    },
    reducers: {
        clearRecipeDetails: (state) => {
            state.data = null;
            state.processedData = {
                recipe: null,
                categoryName: '',
                author: null
            };
            state.isFavorite = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchRecipeById
            .addCase(fetchRecipeById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecipeById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchRecipeById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Handle fetchCategories
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })

            // Handle fetchIngredients
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
            })

            // Handle checkFavoriteStatus
            .addCase(checkFavoriteStatus.fulfilled, (state, action) => {
                state.isFavorite = action.payload;
            })

            // Handle toggleFavoriteStatus
            .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
                state.isFavorite = action.payload;
            })

            // Handle processRecipeData
            .addCase(processRecipeData.pending, (state) => {
                state.isProcessing = true;
            })
            .addCase(processRecipeData.fulfilled, (state, action) => {
                state.isProcessing = false;
                if (action.payload) {
                    state.processedData = action.payload;
                }
            })
            .addCase(processRecipeData.rejected, (state, action) => {
                state.isProcessing = false;
                state.error = action.payload;
            });
    },
});

export const {clearRecipeDetails} = recipeDetailsSlice.actions;
export default recipeDetailsSlice.reducer;

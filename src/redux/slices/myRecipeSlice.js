import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteRecipeById, getMyRecipe} from "@/services/index.js";

export const fetchMyRecipe = createAsyncThunk(
    "myrecipe/fetch",
    async (_, {rejectWithValue}) => {
        try {
            return await getMyRecipe();
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch my recipes");
        }
    }
);

export const deleteMyRecipe = createAsyncThunk(
    "myrecipe/delete",
    async (recipeId, {rejectWithValue}) => {
        try {
            await deleteRecipeById(recipeId);
            return recipeId;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to delete recipe");
        }
    }
);

const myRecipeSlice = createSlice({
    name: "myrecipe",
    initialState: {
        data: [],
        isLoading: false,
        isDeleting: false, // <-- добавлено
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyRecipe.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMyRecipe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchMyRecipe.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteMyRecipe.pending, (state) => {
                state.isDeleting = true; // <-- изменено
                state.error = null;
            })
            .addCase(deleteMyRecipe.fulfilled, (state, action) => {
                state.isDeleting = false;
                const idToDelete = action.payload;

                // если data - массив рецептов
                if (Array.isArray(state.data)) {
                    state.data = state.data.filter((recipe) => recipe.id !== idToDelete);
                }
            })
            .addCase(deleteMyRecipe.rejected, (state, action) => {
                state.isDeleting = false; // <-- изменено
                state.error = action.payload;
            });
    },
});

export default myRecipeSlice.reducer;

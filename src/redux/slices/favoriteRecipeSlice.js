import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getFavorites, removeFromFavorites} from "@/services/favoritesService";

export const fetchFavorites = createAsyncThunk(
    "favorites/fetch",
    async (_, {rejectWithValue}) => {
        try {
            return await getFavorites();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteFavorite = createAsyncThunk(
    "favorites/delete",
    async (recipeId, {rejectWithValue}) => {
        try {
            await removeFromFavorites(recipeId);
            return recipeId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete from favorites"
            );
        }
    }
);

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        data: [],
        isLoading: false,
        isDeleting: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.recipes || [];
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteFavorite.pending, (state) => {
                state.isDeleting = true;
                state.error = null;
            })
            .addCase(deleteFavorite.fulfilled, (state, action) => {
                state.isDeleting = false;
                const deletedId = action.payload;
                state.data = state.data.filter((recipe) => recipe.id !== deletedId);
            })
            .addCase(deleteFavorite.rejected, (state, action) => {
                state.isDeleting = false;
                state.error = action.payload;
            });
    },
});

export default favoritesSlice.reducer;

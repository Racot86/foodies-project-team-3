import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeFromFavorites } from "@/services/recipeService";
import axios from "axios";
import { BASE_URL } from "@/services/api";

// Получение всех избранных рецептов
export const fetchFavorites = createAsyncThunk(
  "favorites/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/recipes/myfavorites`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch favorites"
      );
    }
  }
);

// Удаление рецепта из избранного
export const deleteFavorite = createAsyncThunk(
  "favorites/delete",
  async (recipeId, { rejectWithValue }) => {
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
      // Fetch
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete
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

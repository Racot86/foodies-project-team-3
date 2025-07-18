import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes } from "@/services/recipeService";

export const fetchUserRecipes = createAsyncThunk(
  "userRecipes/fetch",
  async ({ userId, page = 1, limit = 12 }, { rejectWithValue }) => {
    try {
      const response = await getRecipes({
        ownerId: userId,
        page,
        limit
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user recipes");
    }
  }
);

const userRecipesSlice = createSlice({
  name: "userRecipes",
  initialState: {
    data: [],
    total: 0,
    totalPages: 0,
    page: 1,
    limit: 12,
    isLoading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    clearUserRecipes: (state) => {
      state.data = [];
      state.total = 0;
      state.totalPages = 0;
      state.page = 1;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.recipes;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchUserRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, clearUserRecipes } = userRecipesSlice.actions;

export default userRecipesSlice.reducer;

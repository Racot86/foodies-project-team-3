import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addRecipeService } from "@services/addRecipeService.js";

export const postRecipe = createAsyncThunk(
  "recipes/postRecipe",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addRecipeService(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipe: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      })
      .addCase(postRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recipesSlice.reducer;

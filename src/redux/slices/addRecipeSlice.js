import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addRecipeService } from "@services/addRecipeService.js";

export const postRecipe = createAsyncThunk(
  "recipes/postRecipe",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addRecipeService(formData);
      return {
        data: response.data,
        status: response.status,
      };
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
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(postRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(postRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = null;
      });
  },
});

export default recipesSlice.reducer;

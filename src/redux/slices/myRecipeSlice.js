import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { myRecipeService } from "@/services";

export const fetchMyRecipe = createAsyncThunk(
  "myrecipe/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myRecipeService();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch my recipes");
    }
  }
);

const myRecipeSlice = createSlice({
  name: "myrecipe",
  initialState: {
    data: [],
    isLoading: false,
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
      });
  },
});

export default myRecipeSlice.reducer;

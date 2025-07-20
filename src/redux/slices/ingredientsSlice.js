import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ingredientsService } from "@/services";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetch",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await ingredientsService(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch ingredients");
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ingredientsSlice.reducer;

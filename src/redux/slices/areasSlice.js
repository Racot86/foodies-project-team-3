import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { areasService } from "@/services";

export const fetchAreas = createAsyncThunk(
  "areas/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await areasService();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch areas");
    }
  }
);

const areasSlice = createSlice({
  name: "areas",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default areasSlice.reducer;

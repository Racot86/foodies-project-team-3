import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {categoriesService} from "@/services";

export const fetchCategories = createAsyncThunk(
    "categories/fetch",
    async (_, {rejectWithValue}) => {
        try {
            return await categoriesService();
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch categories");
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default categoriesSlice.reducer;

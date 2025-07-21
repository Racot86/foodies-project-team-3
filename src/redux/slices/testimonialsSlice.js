import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getTestimonials} from '@/services/api';

// Async thunk for fetching testimonials
export const fetchTestimonials = createAsyncThunk(
    'testimonials/fetchTestimonials',
    async (_, {rejectWithValue}) => {
        try {
            return await getTestimonials();
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch testimonials');
        }
    }
);

// Initial state
const initialState = {
    testimonials: [],
    isLoading: false,
    error: null,
};

// Testimonials slice
export const testimonialsSlice = createSlice({
    name: 'testimonials',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Testimonials
            .addCase(fetchTestimonials.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.testimonials = action.payload;
            })
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Export actions
export const {clearError} = testimonialsSlice.actions;

// Export selectors
export const selectTestimonials = (state) => state.testimonials.testimonials;
export const selectIsTestimonialsLoading = (state) => state.testimonials.isLoading;
export const selectTestimonialsError = (state) => state.testimonials.error;

// Export reducer
export default testimonialsSlice.reducer;

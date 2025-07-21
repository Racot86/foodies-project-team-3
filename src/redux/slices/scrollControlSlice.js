import {createSlice} from '@reduxjs/toolkit';

// Initial state
const initialState = {
    isScrollBlocked: false,
    blockingSource: null, // 'modal', 'burgerMenu', etc.
};

// Scroll control slice
export const scrollControlSlice = createSlice({
    name: 'scrollControl',
    initialState,
    reducers: {
        blockScroll: (state, action) => {
            state.isScrollBlocked = true;
            state.blockingSource = action.payload || 'unknown';
        },
        unblockScroll: (state) => {
            state.isScrollBlocked = false;
            state.blockingSource = null;
        },
    },
});

// Export actions
export const {blockScroll, unblockScroll} = scrollControlSlice.actions;

// Export selectors
export const selectIsScrollBlocked = (state) => state.scrollControl.isScrollBlocked;
export const selectBlockingSource = (state) => state.scrollControl.blockingSource;

// Export reducer
export default scrollControlSlice.reducer;

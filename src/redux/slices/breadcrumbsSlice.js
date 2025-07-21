import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    recipeName: '',
};

export const breadcrumbsSlice = createSlice({
    name: 'breadcrumbs',
    initialState,
    reducers: {
        setRecipeName: (state, action) => {
            state.recipeName = action.payload;
        },
        clearRecipeName: (state) => {
            state.recipeName = '';
        },
    },
});

export const {setRecipeName, clearRecipeName} = breadcrumbsSlice.actions;

export const selectRecipeName = (state) => state.breadcrumbs.recipeName;

export default breadcrumbsSlice.reducer;

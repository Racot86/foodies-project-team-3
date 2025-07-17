import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import breadcrumbsReducer from "./slices/breadcrumbsSlice";
import authReducer from "./slices/authSlice";
import testimonialsReducer from "./slices/testimonialsSlice";
import areasReducer from "./slices/areasSlice";
import categoriesReducer from "./slices/categoriesSlice";
import ingredientsReducer from "./slices/ingredientsSlice";
import recipesReducer from "./slices/addRecipeSlice";
import userReducer from "./slices/userSlice";
import followersReducer from "./slices/followerSlice";

export const store = configureStore({
  reducer: {
    breadcrumbs: breadcrumbsReducer,
    auth: authReducer,
    testimonials: testimonialsReducer,
    areas: areasReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
    users: userReducer,
    followers: followersReducer,
  },
});

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @typedef {typeof store.dispatch} AppDispatch
 */

/** @type {() => AppDispatch} */
export const useAppDispatch = useDispatch;

/** @type {import('react-redux').TypedUseSelectorHook<RootState>} */
export const useAppSelector = useSelector;

export default store;
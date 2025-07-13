import { configureStore } from "@reduxjs/toolkit";
import breadcrumbsReducer from "./slices/breadcrumbsSlice";
import authReducer from "./slices/authSlice";
import areasReducer from "./slices/areasSlice";
import categoriesReducer from "./slices/categoriesSlice";
import ingredientsReducer from "./slices/ingredientsSlice";
import recipesReducer from "./slices/addRecipeSlice";

export const store = configureStore({
  reducer: {
    breadcrumbs: breadcrumbsReducer,
    auth: authReducer,
    areas: areasReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
  },
});

export default store;

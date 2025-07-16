import { configureStore } from "@reduxjs/toolkit";
import breadcrumbsReducer from "./slices/breadcrumbsSlice";
import authReducer from "./slices/authSlice";
import testimonialsReducer from "./slices/testimonialsSlice";
import areasReducer from "./slices/areasSlice";
import categoriesReducer from "./slices/categoriesSlice";
import ingredientsReducer from "./slices/ingredientsSlice";
import recipesReducer from "./slices/addRecipeSlice";
import myrecipeReducer from "./slices/myRecipeSlice";

export const store = configureStore({
  reducer: {
    breadcrumbs: breadcrumbsReducer,
    auth: authReducer,
    testimonials: testimonialsReducer,
    areas: areasReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
    myrecipe: myrecipeReducer,
  },
});

export default store;

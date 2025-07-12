import { configureStore } from "@reduxjs/toolkit";
import breadcrumbsReducer from "./slices/breadcrumbsSlice";
import authReducer from "./slices/authSlice";
import areasReducer from "./slices/areasSlice";

export const store = configureStore({
  reducer: {
    breadcrumbs: breadcrumbsReducer,
    auth: authReducer,
    areas: areasReducer,
  },
});

export default store;

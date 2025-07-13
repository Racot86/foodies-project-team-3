import { configureStore } from '@reduxjs/toolkit';
import breadcrumbsReducer from './slices/breadcrumbsSlice';
import authReducer from './slices/authSlice';
import testimonialsReducer from './slices/testimonialsSlice';

export const store = configureStore({
  reducer: {
    breadcrumbs: breadcrumbsReducer,
    auth: authReducer,
    testimonials: testimonialsReducer,
  },
});

export default store;

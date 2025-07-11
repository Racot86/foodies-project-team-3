import { configureStore } from '@reduxjs/toolkit';
import breadcrumbsReducer from './slices/breadcrumbsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    breadcrumbs: breadcrumbsReducer,
    auth: authReducer,
  },
});

export default store;

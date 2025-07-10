import { configureStore } from '@reduxjs/toolkit';
import breadcrumbsReducer from './slices/breadcrumbsSlice';

export const store = configureStore({
  reducer: {
    breadcrumbs: breadcrumbsReducer,
  },
});

export default store;

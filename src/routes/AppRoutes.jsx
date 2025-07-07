import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import AddRecipePage from '@pages/AddRecipePage';
import { Layout } from '@components/layout/Layout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
      </Route>
    </Routes>
  );
};

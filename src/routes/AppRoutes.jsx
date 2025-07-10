import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@pages/home/HomePage";
import AddRecipePage from "@pages/add-recipe/AddRecipePage";
import DesignSystemPreview from "@pages/design-system/DesignSystemPreview";
import { Layout } from "@components/layout/Layout";
import RecipeCategories from "@components/recipe-categories/RecipeCategories";
import CategoryRecepies from "@components/recipe-categories/CategoryRecepies.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />}>
          <Route index element={<RecipeCategories />} />
          <Route
            path="category/:categoryId"
            element={<CategoryRecepies />}
          />
        </Route>
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/design-system" element={<DesignSystemPreview />} />
      </Route>
    </Routes>
  );
};

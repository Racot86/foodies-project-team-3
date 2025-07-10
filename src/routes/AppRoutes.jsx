import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@pages/home/HomePage";
import AddRecipePage from "@pages/add-recipe/AddRecipePage";
import DesignSystemPreview from "@pages/design-system/DesignSystemPreview";
import { Layout } from "@components/layout/Layout";
import RecipeCategories from "@components/recipe-categories/RecepieCategories/RecipeCategories.jsx";
import BrowseCategory from "@components/recipe-categories/BrowseCategory/BrowseCategory.jsx";
import RecipeDetails from "@components/recipe-details/RecipeDetails";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />}>
          <Route index element={<RecipeCategories />} />
          <Route
            path="category/:categoryId"
            element={<BrowseCategory />}
          />
          <Route
            path="recipe-details/:recipeId"
            element={<RecipeDetails />}
          />
        </Route>
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/design-system" element={<DesignSystemPreview />} />
      </Route>
    </Routes>
  );
};

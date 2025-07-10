import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@pages/home/HomePage";
import AddRecipePage from "@pages/add-recipe/AddRecipePage";
import ProfilePage from "@pages/profile/ProfilePage";
import DesignSystemPreview from "@pages/design-system/DesignSystemPreview";
import NotFoundPage from "@pages/not-found/NotFoundPage";
import { Layout } from "@components/layout/Layout";
import RecipeCategories from "@pages/home/components/recipe-categories/RecepieCategories/RecipeCategories.jsx";
import BrowseCategory from "@pages/home/components/recipe-categories/BrowseCategory/BrowseCategory.jsx";
import RecipeDetails from "@pages/recipe-details/RecipeDetails";

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
        </Route>
        <Route path="/recipe-details/:recipeId" element={<RecipeDetails />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/design-system" element={<DesignSystemPreview />} />
      </Route>
      {/* Catch-all route for handling wrong/invalid URLs */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "@pages/home/HomePage";
import AddRecipePage from "@pages/add-recipe/AddRecipePage";
import ProfilePage from "@pages/profile/ProfilePage";
import MyRecipes from "@pages/profile/components/MyRecipes";
import Favorites from "@pages/profile/components/Favorites";
import Followers from "@/pages/profile/followers/Followers";
import Following from "@/pages/profile/following/Following";
import NotFoundPage from "@pages/not-found/NotFoundPage";
import {Layout} from "@components/layout/Layout";
import RecipeCategories from "@pages/home/components/recipe-categories/RecepieCategories/RecipeCategories.jsx";
import BrowseCategory from "@pages/home/components/recipe-categories/BrowseCategory/BrowseCategory.jsx";
import RecipeDetails from "@pages/recipe-details/RecipeDetails";
import PrivateRoute from "@components/PrivateRoute";
import PreLoader from "@components/PreLoader";

export const AppRoutes = () => {
    return (
        <PreLoader>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<HomePage/>}>
                        <Route index element={<RecipeCategories/>}/>
                        <Route path="category/:categoryName" element={<BrowseCategory/>}/>
                    </Route>
                    <Route path="/recipe-details/:recipeId" element={<RecipeDetails/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/add-recipe" element={<AddRecipePage/>}/>
                    </Route>

                    <Route element={<PrivateRoute/>}>
                        <Route path="/profile/:userId?" element={<ProfilePage/>}>
                            <Route index element={<MyRecipes/>}/>
                            <Route path="my-recipes" element={<MyRecipes/>}/>
                            <Route path="favorites" element={<Favorites/>}/>
                            <Route path="followers" element={<Followers/>}/>
                            <Route path="following" element={<Following/>}/>
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </PreLoader>
    );
};

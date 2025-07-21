import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteFavorite, fetchFavorites,} from "@/redux/slices/favoriteRecipeSlice";
import {userDetails} from "@/redux/slices/userSlice";

import css from "./RecipesList.module.css";
import styles from "./recipeCard/RecipeCard.module.css";
import RecipeList from "./recipeCard/RecipeList";
import EmptyState from "./recipeCard/EmptyState";
import RecipesCardSkeleton from "./recipeCard/RecipesCardSkeleton";
import {toast} from "react-toastify";
import PageTransitionWrapper from "@components/pageTransitionWrapper/PageTransitionWrapper.jsx";

const Favorites = () => {
    const dispatch = useDispatch();

    const {data, isLoading, error} = useSelector((state) => state.favorites);
    const {user} = useSelector((state) => state.auth);
    const currentUserId = user?.id;

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(`Something went wrong: ${error}`);
        }
    }, [error]);

    const recipes = data || [];

    const handleDelete = async (recipeId) => {
        await dispatch(deleteFavorite(recipeId));

        // Update user details to refresh the favorites count in the side card
        if (currentUserId) {
            dispatch(userDetails(currentUserId));
        }
    };

    return (
        <PageTransitionWrapper>
            <div className={css.recipeWrap}>
                {isLoading ? (
                    <ul className={styles.recipeCardList}>
                        <RecipesCardSkeleton/>
                    </ul>
                ) : recipes.length > 0 ? (
                    <RecipeList recipes={recipes} onDelete={handleDelete}/>
                ) : (
                    <EmptyState
                        text="Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future."/>
                )}
            </div>
        </PageTransitionWrapper>
    );
};

export default Favorites;

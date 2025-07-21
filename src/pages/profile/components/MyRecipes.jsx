import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {deleteMyRecipe, fetchMyRecipe} from "@/redux/slices/myRecipeSlice.js";
import {fetchUserRecipes, setPage} from "@/redux/slices/userRecipesSlice.js";
import {userDetails} from "@/redux/slices/userSlice";
import RecipeList from "./recipeCard/RecipeList";
import EmptyState from "./recipeCard/EmptyState";
import RecipesCardSkeleton from "./recipeCard/RecipesCardSkeleton";
import css from "./RecipesList.module.css";
import styles from "./recipeCard/RecipeCard.module.css";
import {toast} from "react-toastify";
import PageTransitionWrapper from "@components/pageTransitionWrapper/PageTransitionWrapper.jsx";

const MyRecipes = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();

    const myRecipeState = useSelector((state) => state.myrecipe);
    const userRecipesState = useSelector((state) => state.userRecipes);
    const {user} = useSelector((state) => state.auth);
    const currentUserId = user?.id;

    const isViewingOtherUser = !!userId;
    const {
        data: myData,
        isLoading: myIsLoading,
        error: myError,
    } = myRecipeState;

    const {
        data: userRecipesData,
        isLoading: userRecipesIsLoading,
        error: userRecipesError,
        page: userRecipesPage,
        totalPages: userRecipesTotalPages,
        total: userRecipesTotal,
        limit: userRecipesLimit,
    } = userRecipesState;

    const data = isViewingOtherUser ? userRecipesData : myData;
    const isLoading = isViewingOtherUser ? userRecipesIsLoading : myIsLoading;
    const error = isViewingOtherUser ? userRecipesError : myError;

    const currentPage = isViewingOtherUser ? userRecipesPage : 1;
    const totalPages = isViewingOtherUser ? userRecipesTotalPages : 1;
    const totalRecipes = isViewingOtherUser
        ? userRecipesTotal
        : data?.length || 0;

    const recipes = data?.recipes || data || [];

    useEffect(() => {
        if (isViewingOtherUser) {
            dispatch(
                fetchUserRecipes({
                    userId,
                    page: currentPage,
                    limit: userRecipesLimit,
                })
            );
        } else {
            dispatch(fetchMyRecipe());
        }
    }, [dispatch, userId, isViewingOtherUser, currentPage, userRecipesLimit]);

    const handlePageChange = (page) => {
        if (isViewingOtherUser) {
            dispatch(setPage(page));
        }
    };

    const deleteRecipe = async (id) => {
        if (isViewingOtherUser) {
            return;
        }

        const result = await dispatch(deleteMyRecipe(id));
        if (deleteMyRecipe.fulfilled.match(result)) {
            dispatch(fetchMyRecipe());

            // Update user details to refresh the recipe count in the side card
            if (currentUserId) {
                dispatch(userDetails(currentUserId));
            }
        } else {
            toast.error(
                `Failed to delete the recipe: ${result.payload || "Unknown error"}`
            );
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(`Something went wrong: ${error}`);
        }
    }, [error]);

    return (
        <PageTransitionWrapper>
            <div className={css.recipeWrap}>
                {isLoading ? (
                    <ul className={styles.recipeCardList}>
                        <RecipesCardSkeleton/>
                    </ul>
                ) : recipes.length > 0 ? (
                    <>
                        <RecipeList
                            recipes={recipes}
                            onDelete={deleteRecipe}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            useServerPagination={isViewingOtherUser}
                        />
                        {isViewingOtherUser && (
                            <div className={css.recipesInfo}>
                                <p>Total recipes: {totalRecipes}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <EmptyState
                        text="Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future."/>
                )}
            </div>
        </PageTransitionWrapper>
    );
};

export default MyRecipes;

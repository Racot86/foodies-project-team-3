import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiArrowUpRight } from 'react-icons/fi';
import { ButtonIcon } from '@components/ui/ButtonIcon/ButtonIcon';
import Heading from '@components/ui/Heading/Heading';
import { getRecipeById, addToFavorites, removeFromFavorites, isRecipeInFavorites } from '../../services/recipeService';
import { DEFAULT_AVATAR, DEFAULT_RECIPE_IMAGE } from '@/services/api.js';
import styles from './RecipeCard.module.css';
import { useBreakpoint } from '@/hooks/useBreakpoint.js';
import { useAuthRedux } from '@/hooks';
import SignInModal from '@/components/signInModal/SignInModal';
import PrivateContentArea from "@components/privateContentArea/PrivateContentArea.jsx";
import { toast } from 'react-toastify';
import RecipeCardSkeleton from '@/components/recipeCardSkeleton/RecipeCardSkeleton';

const FALLBACK_IMAGE = DEFAULT_RECIPE_IMAGE;


const RecipeCard = ({ recipeId, recipe: initialRecipe, loading: externalLoading }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState(initialRecipe || null);
  const [internalLoading, setInternalLoading] = useState(!initialRecipe);
  const [error, setError] = useState(null);
  // Initialize image loading states to true if there's no recipe (to avoid showing loader when not needed)
  const [recipeImageLoaded, setRecipeImageLoaded] = useState(!recipe);
  const [avatarImageLoaded, setAvatarImageLoaded] = useState(!recipe);

  // Use external loading state if provided, otherwise use internal loading state
  const dataLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  // Only check image loading states if we have a recipe and data is not loading
  // This prevents the loader from showing indefinitely if images fail to trigger onLoad
  const imageLoading = recipe && !dataLoading ? (!recipeImageLoaded || !avatarImageLoaded) : false;

  // Final loading state
  const loading = dataLoading || imageLoading;

  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);


  // Use breakpoint to determine heading level
  const { breakpoint } = useBreakpoint();
  const isMobile = breakpoint === 'mobile' || breakpoint === 'mobile-small';

  // Authentication and navigation
  const { isAuthenticated } = useAuthRedux();
  const navigate = useNavigate();

  const fetchRecipe = async (id) => {
    setInternalLoading(true);
    setError(null);

    try {
      const data = await getRecipeById(id);
      setRecipe(data);
      setInternalLoading(false);
    } catch (err) {
      console.error('Error fetching recipe:', err);
      setError('Failed to load recipe');
      setInternalLoading(false);
    }
  };

  useEffect(() => {
    if (recipeId && !initialRecipe) {
      fetchRecipe(recipeId);
    }
  }, [recipeId, initialRecipe]);

  // Reset image loading states when recipe changes
  useEffect(() => {
    if (recipe) {
      // Reset image loading states when a new recipe is loaded
      setRecipeImageLoaded(false);
      setAvatarImageLoaded(false);

      // Safety timeout: if images don't load within 5 seconds, consider them loaded anyway
      // This prevents infinite loading if onLoad events don't fire
      const timeoutId = setTimeout(() => {
        setRecipeImageLoaded(true);
        setAvatarImageLoaded(true);
      }, 5000);

      // Clean up timeout if component unmounts or recipe changes
      return () => clearTimeout(timeoutId);
    }
  }, [recipe?.id]);

  // Check if recipe is in favorites when recipe data is loaded
  useEffect(() => {
    if (recipe && isAuthenticated) {
      const checkFavoriteStatus = async () => {
        try {
          const isFav = await isRecipeInFavorites(recipe.id);
          setIsFavorite(isFav);
        } catch (err) {
          console.error('Error checking favorite status:', err);
          // Keep the current state if there's an error
        }
      };

      checkFavoriteStatus();
    }
  }, [recipe, isAuthenticated]);

  const handleFavoriteClick = async () => {


    try {
      if (isFavorite) {
        await removeFromFavorites(recipe.id);
        toast.success(`"${title}" removed from favorites`, { position: "top-center", autoClose: 3000 });
      } else {
        await addToFavorites(recipe.id);
        toast.success(`"${title}" added to favorites`, { position: "top-center", autoClose: 3000 });
      }
      // Toggle favorite state
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error updating favorites:', err);
      toast.error(`Failed to update favorites: ${err.message || 'Unknown error'}`, { position: "top-center", autoClose: 3000 });
    }
  };

  const handleAuthorClick = () => {
      navigate(`/profile/${recipe.owner.id}`);
  };


  // Show loading state
  if (loading) {
    return <RecipeCardSkeleton />;
  }

  // Show error state
  if (error || !recipe) {
    return (
      <div className={`${styles.card} ${styles.error}`}>
        <p>{error || 'Recipe not found'}</p>
      </div>
    );
  }

  const { id, title, instructions, image, owner } = recipe;

  // Truncate instructions to 2 lines (approximately 120 characters)
  const truncatedInstructions = instructions.length > 120
    ? `${instructions.substring(0, 120)}...`
    : instructions;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            src={imageError ? FALLBACK_IMAGE : image}
            alt={title}
            className={styles.image}
            onLoad={() => setRecipeImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setRecipeImageLoaded(true); // Consider error as "loaded" to avoid infinite loading
            }}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <Heading
              level={isMobile ? 3 : 4}
              className={styles.title}
              weight="bold2"
              color="primary"
            >
              {title}
            </Heading>
            <p className={styles.instructions}>{truncatedInstructions}</p>
          </div>

          <div className={styles.footer}>
            {/* Author section as a button */}
            <PrivateContentArea>
            <button
              type="button"
              className={styles.author}
              onClick={handleAuthorClick}
            >
              <img
                src={avatarError || !owner.avatar ? DEFAULT_AVATAR : owner.avatar}
                alt={owner.name}
                className={styles.avatar}
                onLoad={() => setAvatarImageLoaded(true)}
                onError={() => {
                  setAvatarError(true);
                  setAvatarImageLoaded(true); // Consider error as "loaded" to avoid infinite loading
                }}
              />
              <span className={styles.authorName}>{owner.name}</span>
            </button>
            </PrivateContentArea>
            <div className={styles.actions}>
              <PrivateContentArea>
              {/* Favorite button */}
              <ButtonIcon
                onClick={handleFavoriteClick}
                variant={isFavorite ? ButtonIcon.variants.PRIMARY : ButtonIcon.variants.DEFAULT}
                className={styles.favoriteButton}
              >
                <FiHeart />
              </ButtonIcon>
              </PrivateContentArea>
              {/* Recipe details link */}
              <Link to={`/recipe-details/${id}`} className={styles.linkButton}>
                <ButtonIcon>
                  <FiArrowUpRight />
                </ButtonIcon>
              </Link>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

RecipeCard.propTypes = {
  recipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
  recipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    owner: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      email: PropTypes.string
    }).isRequired,
    category: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string
    }),
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredient: PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          name: PropTypes.string,
          description: PropTypes.string,
          image: PropTypes.string
        }),
        measure: PropTypes.string
      })
    ),
    area: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string
    })
  })
};

RecipeCard.defaultProps = {
  recipeId: null,
  recipe: null,
  loading: undefined
};

export default RecipeCard;

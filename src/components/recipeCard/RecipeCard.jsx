import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiArrowUpRight } from 'react-icons/fi';
import { ButtonIcon } from '@components/ui/ButtonIcon/ButtonIcon';
import { Loader } from '@components/ui';
import Heading from '@components/ui/Heading/Heading';
import { getRecipeById, addToFavorites, removeFromFavorites } from '../../services/recipeService';
import { DEFAULT_AVATAR, DEFAULT_RECIPE_IMAGE } from '../../services/api';
import styles from './RecipeCard.module.css';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useAuthRedux } from '@/hooks';
import SignInModal from '@/components/signInModal/SignInModal';

const FALLBACK_IMAGE = DEFAULT_RECIPE_IMAGE;
const FALLBACK_AVATAR = DEFAULT_AVATAR;

const RecipeCard = ({ recipeId, recipe: initialRecipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState(initialRecipe || null);
  const [loading, setLoading] = useState(!initialRecipe);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  
  // Use breakpoint to determine heading level
  const { breakpoint } = useBreakpoint();
  const isMobile = breakpoint === 'mobile' || breakpoint === 'mobile-small';
  
  // Authentication and navigation
  const { isAuthenticated } = useAuthRedux();
  const navigate = useNavigate();

  const fetchRecipe = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getRecipeById(id);
      setRecipe(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching recipe:', err);
      setError('Failed to load recipe');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (recipeId && !initialRecipe) {
      fetchRecipe(recipeId);
    }
  }, [recipeId, initialRecipe]);
  
  // Check if recipe is in favorites when recipe data is loaded
  useEffect(() => {
    if (recipe && isAuthenticated) {
      // Here you would check if the recipe is in user's favorites
      // For now, we'll just use the local state
    }
  }, [recipe, isAuthenticated]);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      // Show sign in modal if user is not authenticated
      setShowSignInModal(true);
      return;
    }
    
    try {
      if (isFavorite) {
        await removeFromFavorites(recipe.id);
      } else {
        await addToFavorites(recipe.id);
      }
      // Toggle favorite state
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error updating favorites:', err);
      // Show error notification if needed
    }
  };
  
  const handleAuthorClick = () => {
    if (!isAuthenticated) {
      // Show sign in modal if user is not authenticated
      setShowSignInModal(true);
    } else {
      // Navigate to author's profile page
      navigate(`/user/${owner.id}`);
    }
  };
  
  const handleCloseModal = () => {
    setShowSignInModal(false);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className={`${styles.card} ${styles.loading}`}> 
        <Loader size={40} />
      </div>
    );
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
            onError={() => setImageError(true)}
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
            <button 
              type="button" 
              className={styles.author}
              onClick={handleAuthorClick}
            >
              <img 
                src={avatarError || !owner.avatar ? DEFAULT_AVATAR : owner.avatar} 
                alt={owner.name} 
                className={styles.avatar}
                onError={() => setAvatarError(true)} 
              />
              <span className={styles.authorName}>{owner.name}</span>
            </button>
          
            <div className={styles.actions}>
              {/* Favorite button */}
              <ButtonIcon 
                onClick={handleFavoriteClick} 
                className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
              >
                <FiHeart />
              </ButtonIcon>
            
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

      {/* Sign In Modal */}
      {showSignInModal && (
        <SignInModal 
          onClose={handleCloseModal} 
          onOpenSignUp={() => {
            handleCloseModal();
            // Here you could open SignUp modal if needed
          }} 
        />
      )}
    </>
  );
};

RecipeCard.propTypes = {
  recipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  recipe: null
};

export default RecipeCard;
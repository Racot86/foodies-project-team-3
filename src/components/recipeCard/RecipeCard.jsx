import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiHeart, FiArrowUpRight } from 'react-icons/fi';
import { ButtonIcon } from '@components/ui/ButtonIcon/ButtonIcon';
import Heading from '@components/ui/Heading/Heading';
import { getRecipeById } from '../../services/recipeService';
import { DEFAULT_AVATAR } from '../../services/api';
import styles from './RecipeCard.module.css';
import { useBreakpoint } from '../../hooks/useBreakpoint';

const FALLBACK_IMAGE = 'https://via.placeholder.com/300x200?text=No+Image';
const FALLBACK_AVATAR = DEFAULT_AVATAR;

const RecipeCard = ({ recipeId, recipe: initialRecipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState(initialRecipe || null);
  const [loading, setLoading] = useState(!initialRecipe);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  
  // Use breakpoint to determine heading level
  const { breakpoint } = useBreakpoint();
  const isMobile = breakpoint === 'mobile' || breakpoint === 'mobile-small';

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
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // Here you would call the API to add/remove from favorites
    // For now, we'll just toggle the state locally
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className={`${styles.card} ${styles.loading}`}>
        <div className={styles.loadingAnimation}></div>
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
        <div className={styles.titleContainer} >
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
          <div className={styles.author}>
            <img 
              src={avatarError || !owner.avatar ? DEFAULT_AVATAR : owner.avatar} 
              alt={owner.name} 
              className={styles.avatar}
              onError={() => setAvatarError(true)} 
            />
            <span className={styles.authorName}>{owner.name}</span>
          </div>
        
          <div className={styles.actions}>
            <ButtonIcon 
              onClick={handleFavoriteClick} 
              className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
            >
              <FiHeart />
            </ButtonIcon>
          
            <Link to={`/recipe-details/${id}`} className={styles.linkButton}>
              <ButtonIcon>
                <FiArrowUpRight />
              </ButtonIcon>
            </Link>
          </div>
        </div>
      </div>
    </div>
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
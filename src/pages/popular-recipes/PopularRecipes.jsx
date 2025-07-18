import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styles from './PopularRecipes.module.css';
import { useSelector } from 'react-redux';

const PopularRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state?.auth?.token);

  const fetchExtraRecipes = async () => {
    try {
      const ids = [119, 120];
      const responses = await Promise.all(
        ids.map(id =>
          fetch(`https://project-team-3-backend-2.onrender.com/api/recipes/${id}`)
            .then(res => res.ok ? res.json() : null)
        )
      );
      return responses.filter(Boolean);
    } catch (err) {
      console.error('Error fetching extra recipes:', err);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesRes, favRes, extraRecipes] = await Promise.all([
          fetch('https://project-team-3-backend-2.onrender.com/api/recipes/popular'),
          fetch('https://project-team-3-backend-2.onrender.com/api/recipes/myfavorites', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetchExtraRecipes(),
        ]);

        const recipesData = await recipesRes.json();
        const favData = await favRes.json();

        const base = recipesData.recipes || [];
        const baseIds = new Set(base.map(r => r._id || r.id));
        const uniqueExtras = extraRecipes.filter(r => !baseIds.has(r._id || r.id));

        const combined = [...base, ...uniqueExtras];
        const valid = combined.filter(
          (recipe) => recipe.title && recipe.image && recipe.owner?.name
        );

        setRecipes(valid);
        setFavorites(favData.recipes?.map(r => r._id || r.id) || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchPublic = async () => {
      try {
        const [res, extraRecipes] = await Promise.all([
          fetch('https://project-team-3-backend-2.onrender.com/api/recipes/popular'),
          fetchExtraRecipes(),
        ]);
        const data = await res.json();

        const base = data.recipes || [];
        const baseIds = new Set(base.map(r => r._id || r.id));
        const uniqueExtras = extraRecipes.filter(r => !baseIds.has(r._id || r.id));

        const combined = [...base, ...uniqueExtras];
        const valid = combined.filter(
          (recipe) => recipe.title && recipe.image && recipe.owner?.name
        );

        setRecipes(valid);
      } catch (err) {
        console.error('Public fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    token ? fetchData() : fetchPublic();
  }, [token]);

  const handleToggleFavorite = async (id) => {
    if (!token) {
      alert('Please sign in to manage favorites.');
      return;
    }

    const isFav = favorites.includes(id);
    const url = `https://project-team-3-backend-2.onrender.com/api/recipes/${id}/favorites`;

    try {
      const res = await fetch(url, {
        method: isFav ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Favorite update failed');

      setFavorites((prev) =>
        isFav ? prev.filter((rid) => rid !== id) : [...prev, id]
      );
    } catch (err) {
      console.error('Favorite toggle failed:', err.message);
    }
  };

  const selectedRecipes = recipes.slice(0, 4);

  if (loading) return <p>Loading popular recipes...</p>;
  if (selectedRecipes.length === 0) return <p>No recipes found</p>;

  return (
    <section className={styles['popular-recipes']}>
      <h2 className={styles['section-title']}>Popular Recipes</h2>
      <div className={styles['recipes-grid']}>
        {selectedRecipes.map((recipe) => {
          const id = recipe._id || recipe.id;
          const isFavorite = favorites.includes(id);

          return (
            <div key={id} className={styles['recipe-card']}>
              <Link to={`/recipe/${id}`} className={styles['card-link']}>
                <div className={styles['image-wrapper']}>
                  <img src={recipe.image} alt={recipe.title} />
                </div>
                <h3 className={styles['recipe-title']}>{recipe.title.toUpperCase()}</h3>
                <p className={styles['recipe-description']}>
                  {recipe.instructions?.slice(0, 100)}...
                </p>
              </Link>

              <div className={styles['author-and-icons']}>
                <div className={styles['author-info']}>
                  <img
                    className={styles['avatar']}
                    src={recipe.owner.avatar || 'https://i.pravatar.cc/150?img=13'}
                    alt={recipe.owner.name}
                  />
                  <span className={styles['owner-name']}>{recipe.owner.name}</span>
                </div>
                <div className={styles['action-icons']}>
                  <button
                    className={styles['icon-button']}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={() => handleToggleFavorite(id)}
                  >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <Link
                    to={`/recipe/${id}`}
                    className={styles['icon-button']}
                    title="Open recipe"
                  >
                    <img
                      src="/arrow-up-right.png"
                      alt="Open"
                      style={{ width: '16px', height: '16px' }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularRecipes;

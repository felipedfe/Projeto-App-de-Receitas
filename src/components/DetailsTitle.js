import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addFavorite, getFavorites, removeFromFavorite } from '../services/localStorage';
import MyContext from '../context/MyContext';
import share from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

// const copy = require('clipboard-copy');

const DetailsTitle = ({ type, id }) => {
  const { recipeDetail } = useContext(MyContext);
  const [favorite, setFavorite] = useState(false);
  const route = useRouteMatch();
  let detail;
  if (recipeDetail) {
    if (type === 'meal') {
      detail = {
        id,
        type,
        nationality: recipeDetail.strArea,
        category: recipeDetail.strCategory,
        alcoholicOrNot: '',
        name: recipeDetail.strMeal,
        image: recipeDetail.strMealThumb,
      };
    } else {
      detail = {
        id,
        type,
        nationality: recipeDetail.strArea,
        category: recipeDetail.strCategory,
        alcoholicOrNot: recipeDetail.strAlcoholic,
        name: recipeDetail.strDrink,
        image: recipeDetail.strDrinkThumb,
      };
    }
  }

  useEffect(() => {
    if (favorite) {
      addFavorite(detail);
    } else removeFromFavorite(id);
  }, [favorite]);

  useEffect(() => {
    const favorites = getFavorites() || [];

    favorites.forEach((item) => {
      if (item.id === id) setFavorite(true);
    });
  }, [id]);

  return (
    <section>
      <img
        src={ detail.image }
        alt={ detail.name }
        data-testid="recipe-photo"
        width="300"
      />
      <h1 data-testid="recipe-title">
        { detail.name }
      </h1>
      <button
        type="button"
        data-testid="share-btn"
        src={ share }
        onClick={ () => copy(route) }
      >
        <img src={ share } alt="Share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setFavorite(!favorite) }
      >
        <img
          src={ favorite ? blackHeart : whiteHeart }
          alt="Favorite this recipe recipe?"
        />
      </button>
      <p data-testid="recipe-category">{ detail.category }</p>
      {detail.alcoholicOrNot && <p>{detail.alcoholicOrNot}</p>}
    </section>
  );
};

DetailsTitle.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DetailsTitle;

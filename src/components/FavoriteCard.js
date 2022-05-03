import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getFavorites, removeFromFavorite } from '../services/localStorage';

function FavoriteCard(props) {
  const { recipe: { name,
    category, nationality,
    type,
    alcoholicOrNot,
    image,
    id },
  index,
  setFavoriteRecipesState } = props;

  // URL da receita
  const urlLink = `/${type}s/${id}`;

  // State
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Função para desfavoritar receita
  const makeItUnfavorite = (recipeId) => {
    removeFromFavorite(recipeId);
    const newFavorites = getFavorites();
    setFavoriteRecipesState(newFavorites);
  };

  // Função que copia o link para a página de detalhes da receita
  const copyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000${urlLink}`);
  };

  const handleShareBtnClick = () => {
    copyLink();
    setCopiedMessage(true);
  };

  return (
    <div className="favorite-card-container">
      <Link to={ urlLink }>
        <img
          data-testid={ `${index}-horizontal-image` }
          className="card-image"
          src={ image }
          alt={ name }
        />
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot}
      </p>
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        type="button"
        className="favorite-card-btn"
        src={ shareIcon }
        onClick={ handleShareBtnClick }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button
        data-testid={ `${index}-horizontal-favorite-btn` }
        type="button"
        className="favorite-card-btn"
        src={ blackHeartIcon }
        onClick={ () => makeItUnfavorite(id) }
      >
        <img src={ blackHeartIcon } alt="heart icon" />
      </button>
      {copiedMessage && <p>Link copied!</p>}
    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FavoriteCard;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsShare } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
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
    const location = window.location.origin;
    navigator.clipboard.writeText(`${location}${urlLink}`);
  };

  const handleShareBtnClick = () => {
    copyLink();
    setCopiedMessage(true);
  };

  return (
    <section className="favorite-card">
      <Link to={ urlLink } className="favorite-card-container">
        <img
          className="card-image"
          src={ image }
          alt={ name }
        />
        <section className="done-card-text">
          <h3>{name}</h3>
          <p>
            {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot}
          </p>

        </section>
      </Link>
      <section className="fave-share-sect">
        <button
          type="button"
          className="favorite-card-btn"
          src={ shareIcon }
          onClick={ handleShareBtnClick }
        >
          <BsShare />
          {copiedMessage && <p>Link copied!</p>}
        </button>
        <button
          data-testid={ `${index}-horizontal-favorite-btn` }
          type="button"
          className="favorite-card-btn"
          src={ blackHeartIcon }
          onClick={ () => makeItUnfavorite(id) }
        >
          <FaHeart />
        </button>
      </section>
    </section>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FavoriteCard;

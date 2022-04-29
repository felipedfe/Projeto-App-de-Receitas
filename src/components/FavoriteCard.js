import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard(props) {
  const { recipe: { name, category, nationality, type, alcoholicOrNot, image } } = props;
  return (
    <div className="favorite-card-container">
      <img className="card-image" src={ image } alt={ name } />
      <p>{name}</p>
      <p>{category}</p>
      <p>{type === 'food' && nationality}</p>
      <p>{type === 'drink' && alcoholicOrNot}</p>
      <img src={ shareIcon } alt="share icon" />
      <img src={ blackHeartIcon } alt="heart icon" />
    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FavoriteCard;

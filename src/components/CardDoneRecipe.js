import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipes(props) {
  const { recipes: {
    name,
    category,
    type, alcoholicOrNot,
    id, image,
    nationality, doneDate,
    tags }, index } = props;
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleShareBtnClick = (sentId) => {
    const COPIED_MSG_TIME = 1500;
    navigator.clipboard.writeText(`http://localhost:3000${sentId}`);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), COPIED_MSG_TIME);
  };

  return (
    type === 'food'
      ? (
        <section key={ name } className="favorite-card-container">
          <Link to={ `/foods/${id}` }>
            <img
              src={ image }
              className="card-image"
              alt="Recipe"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>
              { name }
            </p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${nationality} - ${category}` }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
          <section>
            { tags.map((tag) => {
              if (tag) {
                return (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                );
              }
              return null;
            }) }
          </section>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            className="favorite-card-btn"
            onClick={ () => handleShareBtnClick(`/foods/${id}`) }
          >
            <img src={ shareIcon } alt="Share" />
          </button>
          {copiedMessage && <p>Link copied!</p>}
        </section>
      )
      : (
        <section key={ name } className="favorite-card-container">
          <Link to={ `/drinks/${id}` }>
            <img
              src={ image }
              className="card-image"
              alt="Recipe"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>
              { name }
            </p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { alcoholicOrNot }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            className="favorite-card-btn"
            onClick={ () => handleShareBtnClick(`/drinks/${id}`) }
          >
            <img src={ shareIcon } alt="Share" />
          </button>
          {copiedMessage && <p>Link copied!</p>}
        </section>
      )
  );
}

export default CardDoneRecipes;

CardDoneRecipes.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
}.isRequired;

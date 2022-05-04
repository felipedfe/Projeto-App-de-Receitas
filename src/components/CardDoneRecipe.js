import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsShare } from 'react-icons/bs';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import '../style/DonePage.css';

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
        <section className="favorite-card">
          <Link to={ `/foods/${id}` } key={ name } className="favorite-card-container">
            <img
              src={ image }
              className="card-image"
              alt="Recipe"
              data-testid={ `${index}-horizontal-image` }
            />
            <section className="done-card-text">
              <h3 data-testid={ `${index}-horizontal-name` }>
                { name }
              </h3>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${nationality} - ${category}` }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { doneDate.split(' ')[0] }
              </p>
              <section className="tags-sect">
                { tags.map((tag) => {
                  if (tag) {
                    return (
                      <p
                        className="tag"
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
            </section>
          </Link>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            className="done-card-btn"
            onClick={ () => handleShareBtnClick(`/foods/${id}`) }
          >
            <BsShare />
            {copiedMessage && <p>Link copied!</p>}
          </button>
        </section>
      )
      : (
        <section className="favorite-card">
          <Link to={ `/drinks/${id}` } key={ name } className="favorite-card-container">
            <img
              src={ image }
              className="card-image"
              alt="Recipe"
              data-testid={ `${index}-horizontal-image` }
            />
            <section className="done-card-text">
              <h3 data-testid={ `${index}-horizontal-name` }>
                { name }
              </h3>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { alcoholicOrNot }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { doneDate.split(' ')[0] }
              </p>
            </section>
          </Link>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            className="done-card-btn"
            onClick={ () => handleShareBtnClick(`/drinks/${id}`) }
          >
            <BsShare />
            {copiedMessage && <p>Link copied!</p>}
          </button>
        </section>
      )
  );
}

export default CardDoneRecipes;

CardDoneRecipes.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
}.isRequired;

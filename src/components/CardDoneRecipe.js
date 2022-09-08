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
    const location = window.location.origin;
    navigator.clipboard.writeText(`${location}${sentId}`);
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
            />
            <section className="done-card-text">
              <h3>
                { name }
              </h3>
              <p>
                { `${nationality} - ${category}` }
              </p>
              <p>
                { doneDate.split(' ')[0] }
              </p>
              <section className="tags-sect">
                { tags.map((tag) => {
                  if (tag) {
                    return (
                      <p
                        className="tag"
                        key={ tag }
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
            />
            <section className="done-card-text">
              <h3>
                { name }
              </h3>
              <p>
                { alcoholicOrNot }
              </p>
              <p>
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

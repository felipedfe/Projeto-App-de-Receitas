import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';

const CarouselRecom = ({ type }) => {
  const { meals, drinks } = useContext(MyContext);
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/${type === 'meal' ? 'foods' : 'drinks'}/${id}`);
  };

  const cardsLength = 6;

  return (
    <section className="photos-sect">
      {type === 'meal' ? (
        meals.length > 0 && meals.map((card, index) => {
          if (index < cardsLength) {
            return (
              <button
                key={ card.idMeal }
                type="button"
                data-testid={ `${index}-recomendation-card` }
                onClick={ () => handleClick(card.idMeal) }
              >
                <img
                  className="recomendation-img"
                  src={ card.strMealThumb }
                  alt={ card.strMeal }
                />
                <p data-testid={ `${index}-recomendation-title` }>{card.strMeal}</p>
              </button>);
          } return null;
        })
      ) : (
        drinks.length > 0 && drinks.map((card, index) => {
          if (index < cardsLength) {
            return (
              <button
                key={ card.idDrink }
                type="button"
                data-testid={ `${index}-recomendation-card` }
                onClick={ () => handleClick(card.idDrink) }
              >
                <img
                  className="recomendation-img"
                  src={ card.strDrinkThumb }
                  alt={ card.strDrink }
                />
                <p data-testid={ `${index}-recomendation-title` }>{card.strDrink}</p>
              </button>);
          } return null;
        })
      )}
    </section>
  );
};

CarouselRecom.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CarouselRecom;

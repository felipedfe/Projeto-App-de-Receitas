import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';

const CarouselRecom = (type) => {
  const { meals, drinks } = useContext(MyContext);
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/${type === 'meal' ? 'foods' : 'drinks'}/${id}`);
  };

  const cardsLength = 6;

  return (
    <section className="photos-sect">
      {type === 'meal' ? (
        meals.meals.length > 0 && meals.meals.map((card, index) => {
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
              </button>);
          } return null;
        })
      ) : (
        drinks.drinks.length > 0 && drinks.drinks.map((card, index) => {
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
              </button>);
          } return null;
        })
      )}
    </section>
  );
};

export default CarouselRecom;

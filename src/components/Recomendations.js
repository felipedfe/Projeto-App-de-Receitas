import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';

const Recomendations = ({ type }) => {
  const { meals, drinks, getMealsAndDrinks } = useContext(MyContext);

  useEffect(() => {
    if (type === 'meal') {
      getMealsAndDrinks('drink');
    } else {
      getMealsAndDrinks('meal');
    }
  }, []);

  const cardsLength = 6;
  console.log({ type, meals, drinks });
  return type === 'meal' ? (
    <section className="recomendation-sect">
      {Object.keys(drinks).length > 0 && drinks.drinks.map((item, index) => {
        console.log(item);
        if (index < cardsLength) {
          return (
            <button
              id={ item.idDrink }
              type="button"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img width="50" src={ item.strDrinkThumb } alt={ item.strDrink } />
              <p>{item.strDrink}</p>
            </button>
          );
        }
        return null;
      })}
    </section>
  ) : (
    <section className="recomendation-sect">
      {Object.keys(meals).length > 0 && meals.meals.map((item, index) => {
        if (index < cardsLength) {
          return (
            <button
              id={ item.idMeal }
              type="button"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img width="50" src={ item.strMealThumb } alt={ item.strMeal } />
              <p>{item.strMeal}</p>
            </button>
          );
        }
        return null;
      })}
    </section>
  );
};

Recomendations.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recomendations;

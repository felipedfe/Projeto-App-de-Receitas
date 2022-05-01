import React from 'react';
import PropTypes from 'prop-types';
import '../style/recipeCards.css';

function RecipeCard({ recipeType, recipe, index }) {
  const returnNameAndImage = () => {
    switch (recipeType) {
    case 'meal':
      return (
        <>
          <img
            data-testid={ `${index}-card-img` }
            alt={ recipe.strMeal }
            src={ recipe.strMealThumb }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
        </>
      );
    case 'drink':
      return (
        <>
          <img
            data-testid={ `${index}-card-img` }
            alt={ recipe.strDrink }
            src={ recipe.strDrinkThumb }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
        </>
      );
    default:
      return null;
    }
  };

  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      {returnNameAndImage()}
    </div>
  );
}

RecipeCard.propTypes = {
  recipeType: PropTypes.string,
}.isRequired;

export default RecipeCard;

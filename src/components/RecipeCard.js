import React from 'react';
import PropTypes from 'prop-types';
import '../style/recipeCards.css';

function RecipeCard({ recipeType, recipe, index }) {
  const returnNameAndImage = () => {
    if (recipeType === 'meal') {
      return (
        <>
          <img
            className="recipe-card-img"
            alt={ recipe.strMeal }
            src={ recipe.strMealThumb }
          />
          <p>{recipe.strMeal}</p>
        </>
      );
    } if (recipeType === 'drink') {
      return (
        <>
          <img
            className="recipe-card-img"
            alt={ recipe.strDrink }
            src={ recipe.strDrinkThumb }
          />
          <p>{recipe.strDrink}</p>
        </>
      );
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

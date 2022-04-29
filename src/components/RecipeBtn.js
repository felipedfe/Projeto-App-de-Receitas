import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { addInProgressRecipe, getInProgressRecipes } from '../services/localStorage';
import MyContext from '../context/MyContext';
import useIngredients from '../hooks/useIngredients';

const RecipeBtn = ({ type, id }) => {
  const [inProgress, setInProgress] = useState(false);
  const { recipeDetail } = useContext(MyContext);
  const ingredients = useIngredients(recipeDetail);
  const history = useHistory();

  useEffect(() => {
    const recipesInProgress = getInProgressRecipes();
    if (Object.keys(recipesInProgress[type]).length > 0 && recipesInProgress[type][id]) {
      setInProgress(true);
    }
  }, []);

  const handleClick = () => {
    if (!inProgress) {
      addInProgressRecipe(type, id, ingredients);
      if (type === 'meals') {
        history.push(`/foods/${id}/in-progress`);
      } else {
        history.push(`/drinks/${id}/in-progress`);
      }
    }
  };

  return (
    <button
      className="start-btn"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      {inProgress ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
};

RecipeBtn.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeBtn;

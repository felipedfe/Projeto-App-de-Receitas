import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DetailsTitle from '../components/DetailsTitle';
import MyContext from '../context/MyContext';
import useIngredients from '../hooks/useIngredients';
import { addDoneRecipes, addInProgressRecipe, getInProgressRecipes,
  updateInProgress } from '../services/localStorage';
import '../style/progress.css';

function ProgressFood() {
  const { loading, getRecipe, recipeDetail } = useContext(MyContext);
  const [renderIngredient, setRenderIngredient] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const ingList = useIngredients(recipeDetail);

  useEffect(() => {
    getRecipe('meal', id);
    const recipe = getInProgressRecipes().meals[id] || [];
    if (recipe.length === 0) {
      addInProgressRecipe('meals', id, ingList);
    }
    setRenderIngredient(recipe);
    return () => setRenderIngredient(renderIngredient);
  }, []);

  useEffect(() => {
    if (getInProgressRecipes().meals[id].length === 0) {
      setRenderIngredient(ingList);
    }
  }, [ingList]);

  useEffect(() => {
    const recipes = getInProgressRecipes().meals[id];
    setRenderIngredient(recipes);
  }, [recipeDetail]);

  const handleChange = ({ target: { checked } }, index) => {
    const currIngredient = { ...renderIngredient[index], check: checked };
    const newIngredients = renderIngredient.map((item, ind) => {
      if (ind === index) return currIngredient;
      return item;
    });
    setRenderIngredient(newIngredients);
    updateInProgress('meals', id, newIngredients);
  };

  const handleClick = () => {
    const details = {
      id,
      type: 'meals',
      nationality: recipeDetail.strArea,
      category: recipeDetail.strCategory,
      alcoholicOrNot: '',
      name: recipeDetail.strMeal,
      image: recipeDetail.strMealThumb,
      doneDate: new Date().toLocaleString(),
      tags: recipeDetail.strTags,
    };
    addDoneRecipes('meals', details);
    history.push('/done-recipes');
  };

  return (
    !loading && (
      <section>
        <DetailsTitle type="meal" id={ id } recipeDetail={ recipeDetail } />
        <section className="ing-checkbox-sect">
          {renderIngredient
            .map(({ measure, ingredient, check = false }, index) => (
              <label
                key={ index }
                htmlFor={ `${index}-ingredient` }
                className={ check ? 'checked' : '' }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ `${index}-ingredient` }
                  name={ ingredient }
                  checked={ check }
                  onChange={ (e) => handleChange(e, index) }
                />
                {`${measure}-${ingredient}`}
              </label>
            ))}
        </section>
        <h2>Instructions</h2>
        <p data-testid="instructions">{recipeDetail.strInstructions}</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !renderIngredient.every(({ check }) => check) }
          onClick={ handleClick }
        >
          Finish recipe
        </button>
      </section>
    )
  );
}

export default ProgressFood;

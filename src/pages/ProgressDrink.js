import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import DetailsTitle from '../components/DetailsTitle';
import MyContext from '../context/MyContext';
import { addDoneRecipes, getInProgressRecipes,
  updateInProgress, addInProgressRecipe } from '../services/localStorage';
import useIngredients from '../hooks/useIngredients';

function ProgressDrink() {
  const { loading, getRecipe, recipeDetail } = useContext(MyContext);
  const [renderIngredient, setRenderIngredient] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const ingList = useIngredients(recipeDetail);

  useEffect(() => {
    getRecipe('drink', id);
    const recipes = getInProgressRecipes().cocktails[id] || [];
    if (recipes.length === 0) {
      addInProgressRecipe('cocktails', id, ingList);
    }
    setRenderIngredient(recipes);
    return () => setRenderIngredient(renderIngredient);
  }, []);

  useEffect(() => {
    const recipes = getInProgressRecipes().cocktails[id] || [];
    if (recipes.length === 0) {
      setRenderIngredient(ingList);
    }
  }, [ingList]);

  useEffect(() => {
    const recipes = getInProgressRecipes().cocktails[id];
    setRenderIngredient(recipes);
  }, [recipeDetail]);

  const handleChange = ({ target: { checked } }, index) => {
    const currIngredient = { ...renderIngredient[index], check: checked };
    const newIngredients = renderIngredient.map((item, ind) => {
      if (ind === index) return currIngredient;
      return item;
    });
    setRenderIngredient(newIngredients);
    updateInProgress('cocktails', id, newIngredients);
  };

  const handleClick = () => {
    const details = {
      id,
      type: 'drink',
      nationality: '',
      category: recipeDetail.strCategory,
      alcoholicOrNot: recipeDetail.strAlcoholic,
      name: recipeDetail.strDrink,
      image: recipeDetail.strDrinkThumb,
      doneDate: new Date().toLocaleString(),
      tags: recipeDetail.strTags,
    };
    addDoneRecipes('cocktails', details);
    history.push('/done-recipes');
  };

  return (
    renderIngredient && renderIngredient.length > 0 ? (
      !loading && (
        <section className="progress-sect">
          <DetailsTitle type="drink" id={ id } recipeDetail={ recipeDetail } />
          <h2 className="progress-subtitle">Ingredients</h2>
          <section className="ing-checkbox-sect">
            {renderIngredient
              .map(({ measure, ingredient, check = false }, index) => (
                <label
                  key={ index }
                  htmlFor={ `${index}-ingredient` }
                  className={ check ? 'ing-label checked' : 'ing-label' }
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
          <h2 className="progress-subtitle">Instructions</h2>
          <p data-testid="instructions" className="instructions">
            {recipeDetail.strInstructions}
          </p>
          <button
            className="progress-btn"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !renderIngredient.every(({ check }) => check) }
            onClick={ handleClick }
          >
            Finish recipe
          </button>
        </section>
      )
    ) : (
      <section className="progress-sect">
        <p>Recipe not in progress</p>
        <Link className="link" to="/done-recipes">Done recipes</Link>
      </section>
    )
  );
}

export default ProgressDrink;

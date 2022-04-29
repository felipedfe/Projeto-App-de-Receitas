import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import DetailsTitle from '../components/DetailsTitle';
import DetailsTitle from '../components/DetailsTitle';
import RecipeBtn from '../components/RecipeBtn';
import Recomendations from '../components/Recomendations';
import MyContext from '../context/MyContext';
import useIngredients from '../hooks/useIngredients';
import { getDoneRecipes } from '../services/localStorage';

function DetailsDrink() {
  const { id } = useParams();
  const [done, setDone] = useState(false);
  const { loading, getRecipe,
    recipeDetail: detail, getMealsAndDrinks } = useContext(MyContext);
  const ingredients = useIngredients(detail);

  useEffect(() => {
    getRecipe('drink', id);
    getMealsAndDrinks('meal');
    const doneRecipes = getDoneRecipes();
    const isDone = doneRecipes.some((item) => item.idDrink === id);
    setDone(isDone);
  }, []);

  return (
    loading && <p>Loading...</p>,
    !loading && (
      <section>
        {Object.keys(detail).length > 0 && (
          <>
            <DetailsTitle type="drink" recipeDetail={ detail } id={ id } />
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map(({ measure, ingredient }, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${measure} ${ingredient}`}
                </li>
              ))}
            </ul>
            <h2>Instructions</h2>
            <p data-testid="instructions">{detail.strInstructions}</p>
            <h2>Recommended</h2>
            <Recomendations type="meal" />
            {!done && <RecipeBtn type="cocktails" id={ id } />}
          </>
        )}
      </section>
    )
  );
}

export default DetailsDrink;

import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailsTitle from '../components/DetailsTitle';
import Recomendations from '../components/Recomendations';
import useIngredients from '../hooks/useIngredients';
import MyContext from '../context/MyContext';
import RecipeBtn from '../components/RecipeBtn';
import { getDoneRecipes } from '../services/localStorage';
import '../style/details.css';

function DetailsFood() {
  const { id } = useParams();
  const [done, setDone] = useState(false);
  const { recipeDetail: detail, loading,
    getRecipe, getMealsAndDrinks } = useContext(MyContext);
  const ingredients = useIngredients(detail);

  useEffect(() => {
    getRecipe('meal', id);
    getMealsAndDrinks('drink');
    const doneRecipes = getDoneRecipes();
    const isDone = doneRecipes.some((item) => item.id === id);
    setDone(isDone);
  }, []);

  return (
    !loading && (
      <section className="details-sect">
        {Object.keys(detail).length > 0 && (
          <>
            <DetailsTitle type="meal" recipeDetail={ detail } id={ id } />
            <h2 className="details-subtitle">Ingredients</h2>
            <ul className="ingredients-list-dets">
              {ingredients.map(({ measure, ingredient }, index) => (
                <li
                  key={ index }
                >
                  {`${measure}-${ingredient}`}
                </li>
              ))}
            </ul>
            <h2 className="details-subtitle">Instructions</h2>
            <p className="instructions">
              {detail.strInstructions}
            </p>
            <video width="300" controls>
              <source src={ detail.strYoutube } />
              <track
                src="captions_en.vtt"
                kind="captions"
                srcLang="en"
                label="english_captions"
              />
            </video>
            <h2 className="details-subtitle">Recommended</h2>
            <Recomendations type="drink" />
            {!done && <RecipeBtn type="meals" id={ id } />}
          </>
        )}
      </section>
    )
  );
}

export default DetailsFood;

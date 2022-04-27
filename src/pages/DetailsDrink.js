import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailsTitle from '../components/DetailsTitle';
import Recomendations from '../components/Recomendations';
import MyContext from '../context/MyContext';
import useIngredients from '../hooks/useIngredients';
import { fetchDetails } from '../services/api';

function DetailsDrink() {
  const [detail, setDetail] = useState({});
  const ingredients = useIngredients();
  const { id } = useParams();
  const { recipeDetail, setRecipeDetail } = useContext(MyContext);
  console.log({ ingredients, detail, recipeDetail });

  useEffect(() => async () => {
    const data = await fetchDetails('cocktail', id);
    setDetail(data.drinks[0]);
    console.log(data.drinks[0]);
    setRecipeDetail(data.drinks[0]);
  }, [id]);

  return (
    <section>
      <DetailsTitle type="drink" id={ id } />
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map(({ measure, ingredient }, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${measure} ${ingredient}`}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">{detail.strInstructions}</p>
      <video width="300" controls data-testid="video">
        <source src={ detail.strYoutube } />
        <track
          src="captions_en.vtt"
          kind="captions"
          srcLang="en"
          label="english_captions"
        />
      </video>
      <Recomendations type="drink" />
      <button className="start-btn" type="button" data-testid="start-recipe-btn">
        Start Recipe
      </button>
    </section>
  );
}

export default DetailsDrink;

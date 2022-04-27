import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDetails } from '../services/api';
import '../style/detailsFood.css';
import DetailsTitle from '../components/DetailsTitle';
import Recomendations from '../components/Recomendations';
import useIngredients from '../hooks/useIngredients';
import MyContext from '../context/MyContext';

function DetailsFood() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const ingredients = useIngredients();
  const { setRecipeDetail } = useContext(MyContext);

  useEffect(() => async () => {
    const data = await fetchDetails('meal', id);
    console.log(data.meals[0]);
    setDetail(data.meals[0]);
    setRecipeDetail(data.meals[0]);
  }, [id]);

  return (
    <section>
      <DetailsTitle type="meal" id={ id } />
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
      <Recomendations type="meal" />
      <button className="start-btn" type="button" data-testid="start-recipe-btn">
        Start Recipe
      </button>
    </section>
  );
}

export default DetailsFood;

import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailsTitle from '../components/DetailsTitle';
import Recomendations from '../components/Recomendations';
import MyContext from '../context/MyContext';
import useIngredients from '../hooks/useIngredients';
import { fetchDetails } from '../services/api';

function DetailsDrink() {
  const [detail, setDetail] = useState({});
  const { id } = useParams();
  const { getMealsAndDrinks } = useContext(MyContext);
  const ingredients = useIngredients(detail);

  const fetchRecipeDets = async () => {
    getMealsAndDrinks('meal');
    const data = await fetchDetails('cocktail', id);
    setDetail(data.drinks[0]);
  };

  useEffect(() => {
    fetchRecipeDets();
  }, []);

  return (
    <section>
      {Object.keys(detail).length > 0 && (
        <>
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
          <h2>Recommended</h2>
          <Recomendations type="drink" />
          <button className="start-btn" type="button" data-testid="start-recipe-btn">
            Start Recipe
          </button>
        </>
      )}
    </section>
  );
}

export default DetailsDrink;

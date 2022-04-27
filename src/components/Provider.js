import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import { fetchRecipes } from '../services/api';

function Provider({ children }) {
  const [mealResponse, setMealResponse] = useState({ meals: [] });
  const [drinkResponse, setDrinkResponse] = useState({ drinks: {} });
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});
  
  const getMealsAndDrinks = async (type) => {
    const response = await fetchRecipes(type);
    if (type === 'meal') {
      setMeals(response);
    } else setDrinks(response);
  };

  const providerState = {
    mealResponse,
    setMealResponse,
    drinkResponse,
    setDrinkResponse,
    recipeDetail,
    setRecipeDetail,
    meals,
    drinks,
    getMealsAndDrinks,
  };

  return (
    <MyContext.Provider value={ providerState }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import { fetchDetails, fetchRecipes } from '../services/api';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [mealResponse, setMealResponse] = useState({ meals: [] });
  const [drinkResponse, setDrinkResponse] = useState({ drinks: {} });
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});
  const [search, setSearch] = useState(false);

  const getRecipe = async (type, id) => {
    setLoading(true);
    const response = await fetchDetails(type, id);
    let key;
    if (type === 'meal') key = 'meals';
    else key = 'drinks';
    setRecipeDetail(response[key][0]);
  };

  useEffect(() => {
    setLoading(false);
  }, [recipeDetail]);

  const getMealsAndDrinks = async (type) => {
    setLoading(true);
    const response = await fetchRecipes(type);
    if (type === 'meal') {
      setMeals(response.meals);
    } else setDrinks(response.drinks);
    setLoading(false);
  };

  const providerState = {
    loading,
    setLoading,
    mealResponse,
    setMealResponse,
    drinkResponse,
    setDrinkResponse,
    getRecipe,
    recipeDetail,
    setRecipeDetail,
    meals,
    drinks,
    getMealsAndDrinks,
    search,
    setSearch,
  };

  useEffect(() => {
    providerState.recipeDetail = recipeDetail;
  }, [recipeDetail]);

  useEffect(() => {
    providerState.meals = meals;
    providerState.drinks = drinks;
  }, [meals, drinks]);

  useEffect(() => {
    providerState.loading = loading;
  }, [loading]);

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

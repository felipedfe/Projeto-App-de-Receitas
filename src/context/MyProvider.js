import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import { fetchRecipes } from '../services/api';

const MyProvider = ({ children }) => {
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});

  const getMealsAndDrinks = async (type) => {
    const response = await fetchRecipes(type);
    if (type === 'meal') {
      setMeals(response);
    } else setDrinks(response);
  };

  const value = {
    recipeDetail,
    setRecipeDetail,
    meals,
    drinks,
    getMealsAndDrinks,
  };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
};

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;

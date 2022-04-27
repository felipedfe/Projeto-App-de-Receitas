import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';

function Provider({ children }) {
  const [mealResponse, setMealResponse] = useState({ meals: [] });
  const [drinkResponse, setDrinkResponse] = useState({ drinks: {} });

  const providerState = {
    mealResponse,
    setMealResponse,
    drinkResponse,
    setDrinkResponse };

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

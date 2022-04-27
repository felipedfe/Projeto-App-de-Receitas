import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';

function Provider({ children }) {
  const [mealResponse, setMealResponse] = useState({ meals: [] });
  const [drink, setDrink] = useState({});

  const providerState = { mealResponse, setMealResponse, drink, setDrink };

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

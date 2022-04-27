import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import { getMealByName,
  getMealByIngredient,
  getMealByFirstLetter,
  getDrinkByName,
  getDrinkByIngredient,
  getDrinkByFirstLetter,
} from '../services/api';

function SearchBar(props) {
  const { mealResponse, setMealResponse, setDrink } = useContext(MyContext);

  const { history: { location: { pathname } } } = props;
  console.log(pathname);

  // State
  const [searchInput, setSearchInput] = useState('');
  const [radio, setRadio] = useState('ingredient');

  // Função de requisição para as APIs de comida
  const getMeals = async () => {
    let meals = '';
    switch (radio) {
    case 'ingredient':
      meals = await getMealByIngredient(searchInput);
      break;
    case 'name':
      meals = await getMealByName(searchInput);
      break;
    case 'first-letter':
      meals = await getMealByFirstLetter(searchInput);
      break;
    default:
      return null;
    }
    setMealResponse(meals);
    console.log(meals);
  };

  // Função de requisição para as APIs de bebida
  const getDrinks = async () => {
    let drinks = '';
    switch (radio) {
    case 'ingredient':
      drinks = await getDrinkByIngredient(searchInput);
      break;
    case 'name':
      drinks = await getDrinkByName(searchInput);
      break;
    case 'first-letter':
      drinks = await getDrinkByFirstLetter(searchInput);
      break;
    default:
      return null;
    }
    setDrink(drinks);
    console.log(drinks);
  };

  const handleClick = async () => {
    if (pathname === '/foods') {
      getMeals();
    }
    if (pathname === '/drinks') {
      getDrinks();
    }
  };

  const { meals } = mealResponse;

  return (
    <div className="search-container">
      {meals.length === 1 && <Redirect to="/" />}
      <span>SearchBar: </span>
      <input
        type="text"
        onChange={ ({ target }) => setSearchInput(target.value) }
      />

      <div className="radio-container">
        <input
          type="radio"
          value="ingredient"
          name="search-type"
          data-testid="ingredient-search-radio"
          defaultChecked
          onClick={ ({ target }) => { setRadio(target.value); } }
        />
        Ingredient

        <input
          type="radio"
          name="search-type"
          value="name"
          data-testid="name-search-radio"
          onClick={ ({ target }) => { setRadio(target.value); } }
        />
        Name

        <input
          type="radio"
          name="search-type"
          value="first-letter"
          data-testid="first-letter-search-radio"
          onClick={ ({ target }) => { setRadio(target.value); } }
        />
        First Letter

        <button
          type="button"
          name="search-type"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default SearchBar;

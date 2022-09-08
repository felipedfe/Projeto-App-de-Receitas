import React, { useContext, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import { getMealByName,
  getMealByIngredient,
  getMealByFirstLetter,
  getDrinkByName,
  getDrinkByIngredient,
  getDrinkByFirstLetter,
} from '../services/api';
import '../style/SearchBar.css';

function SearchBar() {
  const { mealResponse,
    setMealResponse,
    setDrinkResponse,
    drinkResponse } = useContext(MyContext);

  const { pathname } = useLocation();

  // State
  const [searchInput, setSearchInput] = useState('');
  const [radio, setRadio] = useState('ingredient');

  const { meals } = mealResponse;
  const { drinks } = drinkResponse;

  // Função de requisição para as APIs de comida
  const getMeals = async () => {
    let mealsList = '';
    if (radio === 'ingredient') {
      mealsList = await getMealByIngredient(searchInput);
    } if (radio === 'name') {
      mealsList = await getMealByName(searchInput);
    } if (radio === 'first-letter') {
      mealsList = await getMealByFirstLetter(searchInput);
    } if (mealsList.message) {
      global.alert('Your search must have only 1 (one) character');
      mealsList = { meals: [] };
    } if (mealsList.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      mealsList = { meals: [] };
    }
    setMealResponse(mealsList);
  };

  // Função de requisição para as APIs de bebida
  const getDrinks = async () => {
    let drinksList = '';
    if (radio === 'ingredient') {
      drinksList = await getDrinkByIngredient(searchInput);
    } if (radio === 'name') {
      drinksList = await getDrinkByName(searchInput);
    } if (radio === 'first-letter') {
      drinksList = await getDrinkByFirstLetter(searchInput);
    } if (drinksList.message) {
      global.alert('Your search must have only 1 (one) character');
      drinksList = { drinks: [] };
    } if (drinksList.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      drinksList = { drinks: [] };
    }
    setDrinkResponse(drinksList);
  };

  const handleClick = async () => {
    if (pathname === '/foods') {
      getMeals();
    }
    if (pathname === '/drinks') {
      getDrinks();
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search by"
        onChange={ ({ target }) => setSearchInput(target.value) }
      />

      <div className="radio-container">
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            value="ingredient"
            name="search-type"
            defaultChecked
            onClick={ ({ target }) => { setRadio(target.value); } }
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="search-type"
            value="name"
            onClick={ ({ target }) => { setRadio(target.value); } }
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            type="radio"
            id="first-letter"
            name="search-type"
            value="first-letter"
            onClick={ ({ target }) => { setRadio(target.value); } }
          />
          First Letter
        </label>
      </div>

      <button
        type="button"
        name="search-type"
        onClick={ handleClick }
      >
        Search
      </button>

      {/* Redireciona para a página de detalhes caso só encontre uma receita */}
      {meals.length === 1 && <Redirect to={ `/foods/${meals[0].idMeal}` } />}
      {drinks.length === 1 && <Redirect to={ `/drinks/${drinks[0].idDrink}` } />}
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default SearchBar;

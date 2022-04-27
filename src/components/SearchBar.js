import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';
import { getMealByName,
  getMealByIngredient,
  getMealByFirstLetter,
  getDrinkByName,
  getDrinkByIngredient,
  getDrinkByFirstLetter,
} from '../services/api';

function SearchBar(props) {
  const { mealResponse,
    setMealResponse,
    setDrinkResponse,
    drinkResponse } = useContext(MyContext);

  // const { history: { location: { pathname } } } = props;
  // console.log(pathname);
  console.log(props);

  // State
  const [searchInput, setSearchInput] = useState('');
  const [radio, setRadio] = useState('ingredient');

  const MAX_RECIPES_TO_RENDER = 12;
  const { meals } = mealResponse;
  const { drinks } = drinkResponse;

  // Função de requisição para as APIs de comida
  const getMeals = async () => {
    let mealsList = '';
    switch (radio) {
    case 'ingredient':
      mealsList = await getMealByIngredient(searchInput);
      break;
    case 'name':
      mealsList = await getMealByName(searchInput);
      break;
    case 'first-letter':
      mealsList = await getMealByFirstLetter(searchInput);
      console.log('-->', mealsList);
      break;
    default:
      return null;
    }
    if (mealsList.message) {
      global.alert('Your search must have only 1 (one) character');
      mealsList = { meals: [] };
    }
    if (mealsList.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      mealsList = { meals: [] };
    }
    setMealResponse(mealsList);
    console.log(mealsList);
  };

  // Função de requisição para as APIs de bebida
  const getDrinks = async () => {
    let drinksList = '';
    switch (radio) {
    case 'ingredient':
      drinksList = await getDrinkByIngredient(searchInput);
      break;
    case 'name':
      drinksList = await getDrinkByName(searchInput);
      break;
    case 'first-letter':
      drinksList = await getDrinkByFirstLetter(searchInput);
      break;
    default:
      return null;
    }
    setDrinkResponse(drinksList);
    console.log(drinksList);
  };

  const handleClick = async () => {
    if (pathname === '/foods') {
      getMeals();
    }
    if (pathname === '/drinks') {
      getDrinks();
    }
  };

  // Função que retorna o render dos Recipe Cards
  const renderCards = (option) => {
    let filteredByQuantity = [];
    switch (option) {
    case 'meal':
      filteredByQuantity = meals
        .filter((item) => meals.indexOf(item) < MAX_RECIPES_TO_RENDER);

      return filteredByQuantity.map((recipeObj, index) => (
        <RecipeCard
          key={ recipeObj.idMeal }
          recipeType="meal"
          recipe={ recipeObj }
          index={ index }
        />));
    case 'drink':
      filteredByQuantity = drinks
        .filter((item) => drinks.indexOf(item) < MAX_RECIPES_TO_RENDER);

      return filteredByQuantity.map((recipeObj, index) => (
        <RecipeCard
          key={ recipeObj.idMeal }
          recipeType="drink"
          recipe={ recipeObj }
          index={ index }
        />));
    default:
      return null;
    }
  };

  return (
    <div className="search-container">
      <span>SearchBar: </span>
      <input
        type="text"
        data-testid="search-input"
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
      </div>

      <button
        type="button"
        name="search-type"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>

      {/* Redireciona para a página de detalhes caso só encontre uma receita */}
      {meals.length === 1 && <Redirect to={ `/foods/${meals[0].idMeal}` } />}
      {drinks.length === 1 && <Redirect to={ `/drinks/${drinks[0].idDrink}` } />}

      {/* Aqui são renderizados os cards das receitas caso sejam encontradas mais de uma */}
      {meals.length > 1 && renderCards('meal')}
      {drinks.length > 1 && renderCards('drink')}
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default SearchBar;

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { loadingDrinks,
  getDrinksByCategory, getDrinkByIngredient } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import MyContext from '../context/MyContext';
import SearchBar from '../components/SearchBar';

function Drinks(props) {
  const { search, getMealsAndDrinks, drinkResponse, setDrinkResponse,
    beverage, setBeverage, ingredientDrinkSelected } = useContext(MyContext);
  const [chosenDrink, setChosenDrink] = useState([]);
  const [wordCategory, setWordCategory] = useState('');
  const { history } = props;
  const NUMBER_CARDS = 12;

  const exploreDrinksIngredients = async () => {
    if (ingredientDrinkSelected) {
      const drink = await getDrinkByIngredient(ingredientDrinkSelected);
      setChosenDrink(drink.drinks.slice(0, NUMBER_CARDS));
    }
  };

  const categoryOptions = ['All', 'Ordinary Drink', 'Cocktail',
    'Other/Unknown', 'Cocoa', 'Milk / Float / Shake'];

  useEffect(() => {
    const drinksScreen = async () => {
      const gettingDrinks = await loadingDrinks();
      setBeverage(gettingDrinks?.drinks.slice(0, NUMBER_CARDS));
      setChosenDrink(gettingDrinks?.drinks.slice(0, NUMBER_CARDS));
      getMealsAndDrinks('drink');
      getMealsAndDrinks('meal');
    };
    drinksScreen();
    exploreDrinksIngredients();
  }, []);

  const handleCategory = async (category) => {
    if (category === 'All' || category === wordCategory) {
      setChosenDrink(beverage);
    } else {
      const gettingCategory = await getDrinksByCategory(category.split(' ').join('_'));
      const getCategory = gettingCategory?.drinks.slice(0, NUMBER_CARDS);
      setChosenDrink(getCategory);
    }
    setWordCategory(category);
  };

  const handleClick = (option) => {
    setDrinkResponse({ drinks: [] });
    if (option === wordCategory) {
      setChosenDrink(beverage);
      setWordCategory('');
    } else {
      handleCategory(option);
    }
  };

  const changePage = (id) => {
    history.push(`/drinks/${id}`);
  };

  return (
    <section>
      <section>
        <Header />
        {search && <SearchBar />}
      </section>
      <section>
        {categoryOptions.map((option) => (
          <button
            key={ option }
            type="button"
            data-testid={ `${option}-category-filter` }
            onClick={ () => handleClick(option) }
          >
            {option}
          </button>
        ))}
      </section>

      {!drinkResponse.drinks.length && (
        <section className="recipe-card-container">
          {chosenDrink?.map((order, index) => (
            <button
              className="recipe-card-btn"
              key={ order.idDrink }
              type="button"
              onClick={ () => changePage(order.idDrink) }
            >
              <RecipeCard
                recipeType="drink"
                recipe={ order }
                index={ index }
              />
            </button>
          ))}
        </section>
      )}

      {drinkResponse.drinks.length > 1 && (
        <section className="recipe-card-container">
          { drinkResponse.drinks.map((order, index) => {
            if (index < NUMBER_CARDS) {
              return (
                <button
                  className="recipe-card-btn"
                  key={ order.idDrink }
                  type="button"
                  onClick={ () => changePage(order.idDrink) }
                >
                  <RecipeCard
                    recipeType="drink"
                    recipe={ order }
                    index={ index }
                  />
                </button>
              );
            } return null;
          })}
        </section>
      )}
      <Footer />
    </section>
  );
}

export default Drinks;

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

// ERRO NO TESTE: 'Milk / Float / Shake' NÃO EXISTE COMO CATEGORIA NA API, DEVENDO SER DIRECIONADA APENAS PARA SHAKE, MAS O TESTE NÃO CONSIDERA ISSO, E PORTANTO, NO BROWSER O RETORNO É NADA.

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { loadingDrinks, getDrinksByCategory } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import MyContext from '../context/MyContext';
import SearchBar from '../components/SearchBar';

function Drinks(props) {
  const { beverage, setBeverage } = useContext(MyContext);
  const { search, getMealsAndDrinks } = useContext(MyContext);
  const [chosenDrink, setChosenDrink] = useState([]);
  const [wordCategory, setWordCategory] = useState('');

  const { history } = props;

  const NUMBER_CARDS = 12;

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
  }, []);

  const handleCategory = async (category) => {
    setWordCategory(category);
    if (category === 'All') {
      setChosenDrink(beverage);
    } else {
      const gettingCategory = await getDrinksByCategory(category);
      const getCategory = gettingCategory?.drinks.slice(0, NUMBER_CARDS);
      setChosenDrink(getCategory);
    }
  };

  const handleClick = (option) => {
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
      <Header />
      {search && <SearchBar />}
      { categoryOptions.map((option) => (
        <div key={ option }>
          <button
            type="button"
            data-testid={ `${option}-category-filter` }
            onClick={ () => handleClick(option) }
          >
            { option }
          </button>
        </div>
      ))}

      { chosenDrink?.map((order, index) => (
        <button
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

      <Footer />
    </section>
  );
}

export default Drinks;

Drinks.propTypes = {
  history: PropTypes.string,
}.isRequired;

// ERRO NO TESTE: 'Milk / Float / Shake' NÃO EXISTE COMO CATEGORIA NA API, DEVENDO SER DIRECIONADA APENAS PARA SHAKE, MAS O TESTE NÃO CONSIDERA ISSO, E PORTANTO, NO BROWSER O RETORNO É NADA.

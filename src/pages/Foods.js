import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';
import Footer from '../components/Footer';
import { loadingFoods, getFoodByCategory } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import MyContext from '../context/MyContext';

function Foods(props) {
  const { foods, setFoods } = useContext(MyContext);
  const { search, getMealsAndDrinks } = useContext(MyContext);
  const [chosenFood, setChosenFood] = useState([]);
  const [wordCategory, setWordCategory] = useState('');

  const { history } = props;

  const NUMBER_CARDS = 12;
  const categoryOptions = ['All', 'Beef', 'Goat', 'Chicken', 'Breakfast', 'Dessert'];

  useEffect(() => {
    const foodScreen = async () => {
      const gettingFoods = await loadingFoods();
      setFoods(gettingFoods?.meals.slice(0, NUMBER_CARDS));
      setChosenFood(gettingFoods?.meals.slice(0, NUMBER_CARDS));
      getMealsAndDrinks('drink');
      getMealsAndDrinks('meal');
    };
    foodScreen();
  }, []);

  const handleCategory = async (category) => {
    setWordCategory(category);
    if (category === 'All') {
      setChosenFood(foods); //
    } else {
      const gettingCategory = await getFoodByCategory(category);
      const testing = gettingCategory?.meals.slice(0, NUMBER_CARDS);
      setChosenFood(testing);
    }
  };
  const handleClick = (option) => {
    if (option === wordCategory) {
      setChosenFood(foods);
      setWordCategory('');
    } else {
      handleCategory(option);
    }
  };

  const changePage = (id) => {
    history.push(`/foods/${id}`);
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

      { chosenFood?.map((food, index) => (
        <button
          key={ food.idMeal }
          type="button"
          onClick={ () => changePage(food.idMeal) }
        >
          <RecipeCard
            recipeType="meal"
            recipe={ food }
            index={ index }
          />
        </button>
      ))}

      <Footer />
    </section>
  );
}

export default Foods;

Foods.propTypes = {
  history: PropTypes.string,
}.isRequired;

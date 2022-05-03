import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';
import Footer from '../components/Footer';
import { loadingFoods, getFoodByCategory, getMealByIngredient } from '../services/api';
import RecipeCard from '../components/RecipeCard';

function Foods(props) {
  const { search, getMealsAndDrinks, foods, setFoods, ingredientFoodSelected
    foods, setFoods, mealResponse, setMealResponse } = useContext(MyContext);
  const [chosenFood, setChosenFood] = useState([]);
  const [wordCategory, setWordCategory] = useState('');

  const { history } = props;

  const NUMBER_CARDS = 12;
  const categoryOptions = ['All', 'Beef', 'Goat', 'Chicken', 'Breakfast', 'Dessert'];

  const exploreIngredients = async () => {
    if (ingredientFoodSelected) {
      const meals = await getMealByIngredient(ingredientFoodSelected);
      setChosenFood(meals.meals);
    }
  };

  useEffect(() => {
    const foodScreen = async () => {
      const gettingFoods = await loadingFoods();
      setFoods(gettingFoods?.meals.slice(0, NUMBER_CARDS));
      setChosenFood(gettingFoods?.meals.slice(0, NUMBER_CARDS));
      getMealsAndDrinks('drink');
      getMealsAndDrinks('meal');
    };
    foodScreen();
    exploreIngredients();
  }, []);

  const handleCategory = async (category) => {
    if (category === 'All' || category === wordCategory) {
      setChosenFood(foods); //
    } else {
      const gettingCategory = await getFoodByCategory(category);
      const getCategory = gettingCategory?.meals.slice(0, NUMBER_CARDS);
      setChosenFood(getCategory);
    }
    setWordCategory(category);
  };
  const handleClick = (option) => {
    setMealResponse({ meals: [] });
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
      <section>
        <Header />
        {search && <SearchBar />}
      </section>
      <section>
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
      </section>

      {!mealResponse.meals.length && (
        <section className="recipe-card-container">
          {chosenFood?.map((food, index) => (
            <button
              className="recipe-card-btn"
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
        </section>
      )}

      {mealResponse.meals.length > 1 && (
        <section className="recipe-card-container">
          {mealResponse.meals.map((food, index) => {
            if (index < NUMBER_CARDS) {
              return (
                <button
                  className="recipe-card-btn"
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
              );
            } return null;
          })}
        </section>
      )}

      <Footer />
    </section>
  );
}

export default Foods;

Foods.propTypes = {
  history: PropTypes.string,
}.isRequired;

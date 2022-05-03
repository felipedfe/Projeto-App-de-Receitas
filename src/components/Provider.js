import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import { fetchDetails,
  fetchRecipes,
  aleatoryFoodsIngredients,
  aleatoryDrinksIngredients, getFoodByNationality } from '../services/api';

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [mealResponse, setMealResponse] = useState({ meals: [] });
  const [drinkResponse, setDrinkResponse] = useState({ drinks: [] });
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState({});
  const [meals, setMeals] = useState({});
  const [search, setSearch] = useState(false);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [ingredientFoodSelected, setIngredientFoodSelected] = useState('');
  const [ingredientDrinkSelected, setIngredientDrinkSelected] = useState('');
  const [nationality, setNationality] = useState([]);
  const [beverage, setBeverage] = useState([]);

  const getRecipe = async (type, id) => {
    setLoading(true);
    const response = await fetchDetails(type, id);
    let key;
    if (type === 'meal') key = 'meals';
    else key = 'drinks';
    setRecipeDetail(response[key][0]);
    setLoading(false);
  };

  useEffect(() => {
    const foodNationality = async () => {
      setLoading(true);
      const response = await getFoodByNationality();
      setNationality(response.meals);
      setLoading(false);
    };
    foodNationality();
  }, []);

  useEffect(() => {
    const aleatoryFoodsIn = async () => {
      setLoading(true);
      const response = await aleatoryFoodsIngredients();
      setFoodIngredients(response.meals);
      setLoading(false);
    };
    aleatoryFoodsIn();
  }, []);

  useEffect(() => {
    const aleatoryDrinkIn = async () => {
      setLoading(true);
      const response = await aleatoryDrinksIngredients();
      setDrinkIngredients(response.drinks);
      setLoading(false);
    };
    aleatoryDrinkIn();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [recipeDetail, foodIngredients, drinkIngredients, nationality, meals, drinks]);

  const getMealsAndDrinks = async (type) => {
    setLoading(true);
    const response = await fetchRecipes(type);
    if (type === 'meal') {
      setMeals(response.meals);
    } else setDrinks(response.drinks);
  };

  const providerState = {
    beverage,
    foods,
    drinks,
    setBeverage,
    setFoods,
    loading,
    setLoading,
    mealResponse,
    setMealResponse,
    drinkResponse,
    setDrinkResponse,
    getRecipe,
    recipeDetail,
    setRecipeDetail,
    meals,
    getMealsAndDrinks,
    search,
    setSearch,
    foodIngredients,
    drinkIngredients,
    setIngredientFoodSelected,
    ingredientFoodSelected,
    ingredientDrinkSelected,
    setIngredientDrinkSelected,
    nationality,
  };

  useEffect(() => {
    providerState.nationality = nationality;
  }, [nationality]);

  useEffect(() => {
    providerState.recipeDetail = recipeDetail;
  }, [recipeDetail]);

  useEffect(() => {
    providerState.meals = meals;
    providerState.drinks = drinks;
  }, [meals, drinks]);

  useEffect(() => {
    providerState.loading = loading;
  }, [loading]);

  useEffect(() => {
    providerState.mealResponse = mealResponse;
    providerState.drinkResponse = drinkResponse;
  }, [mealResponse, drinkResponse]);

  useEffect(() => {
    providerState.search = search;
  }, [search]);

  useEffect(() => {
    providerState.foodIngredients = foodIngredients;
    providerState.drinkIngredients = drinkIngredients;
  }, [foodIngredients, drinkIngredients]);

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

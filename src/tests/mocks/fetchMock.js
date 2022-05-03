const ordinaryDrinks = require('../../../cypress/mocks/ordinaryDrinks');
const otherDrinks = require('../../../cypress/mocks/otherDrinks');
const goatMeals = require('../../../cypress/mocks/goatMeals');
const chickenMeals = require('../../../cypress/mocks/chickenMeals');
const breakfastMeals = require('../../../cypress/mocks/breakfastMeals');
const dessertMeals = require('../../../cypress/mocks/dessertMeals');
const cocktailDrinks = require('../../../cypress/mocks/cocktailDrinks');
const drinks = require('../../../cypress/mocks/drinks');
const oneMeal = require('../../../cypress/mocks/oneMeal');
const oneDrink = require('../../../cypress/mocks/oneDrink');
const meals = require('../../../cypress/mocks/meals');
const soupMeals = require('../../../cypress/mocks/soupMeals');
const beefMeals = require('../../../cypress/mocks/beefMeals');
const oneLetterMeal = require('./oneLetterFood');
const oneLetterDrinks = require('./oneLetterDrinks');
const ginDrink = require('../../../cypress/mocks/ginDrinks');
const emptyMeals = require('../../../cypress/mocks/emptyMeals');
const cocoaDrinks = require('../../../cypress/mocks/cocoaDrinks');
const emptyDrinks = require('../../../cypress/mocks/emptyDrinks');
const mealIngredients = require('../../../cypress/mocks/mealIngredients');
const drinkIngredients = require('../../../cypress/mocks/drinkIngredients');
const italianMeals = require('../../../cypress/mocks/italianMeals');
const areas = require('../../../cypress/mocks/areas');

const fetchMock3 = (url) => {
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast') {
    return Promise.resolve({ json: () => Promise.resolve(breakfastMeals) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') {
    return Promise.resolve({ json: () => Promise.resolve(dessertMeals) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list') {
    return Promise.resolve({ json: () => Promise.resolve(mealIngredients) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') {
    return Promise.resolve({ json: () => Promise.resolve(drinkIngredients) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian') {
    return Promise.resolve({ json: () => Promise.resolve(italianMeals) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?a=list') {
    return Promise.resolve({ json: () => Promise.resolve(areas) });
  }
};

const fetchMock2 = (url) => {
  if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')) {
    return Promise.resolve({ json: () => Promise.resolve(drinks) });
  } if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=')) {
    return Promise.resolve({ json: () => Promise.resolve(oneDrink) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/random.php') {
    return Promise.resolve({ json: () => Promise.resolve(oneMeal) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php') {
    return Promise.resolve({ json: () => Promise.resolve(oneDrink) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') {
    return Promise.resolve({ json: () => Promise.resolve(ordinaryDrinks) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown') {
    return Promise.resolve({ json: () => Promise.resolve(otherDrinks) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') {
    return Promise.resolve({ json: () => Promise.resolve(cocktailDrinks) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') {
    return Promise.resolve({ json: () => Promise.resolve(cocoaDrinks) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
    return Promise.resolve({ json: () => Promise.resolve(beefMeals) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') {
    return Promise.resolve({ json: () => Promise.resolve(goatMeals) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') {
    return Promise.resolve({ json: () => Promise.resolve(chickenMeals) });
  } return fetchMock3(url);
};

const fetchMock = (url) => {
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=aquamarine') {
    return Promise.resolve({ json: () => Promise.resolve(oneDrink) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({ json: () => Promise.resolve(meals) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata') {
    return Promise.resolve({ json: () => Promise.resolve(oneMeal) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup') {
    return Promise.resolve({ json: () => Promise.resolve(soupMeals) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=beef') {
    return Promise.resolve({ json: () => Promise.resolve(beefMeals) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=a') {
    return Promise.resolve({ json: () => Promise.resolve(oneLetterMeal) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin') {
    return Promise.resolve({ json: () => Promise.resolve(ginDrink) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a') {
    return Promise.resolve({ json: () => Promise.resolve(oneLetterDrinks) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=pizzas') {
    return Promise.resolve({ json: () => Promise.resolve(emptyMeals) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=chocolate') {
    return Promise.resolve({ json: () => Promise.resolve(cocoaDrinks) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=chocolates') {
    return Promise.resolve({ json: () => Promise.resolve(emptyDrinks) });
  } if (url.includes('https://www.themealdb.com/api/json/v1/1/lookup.php?i=')) {
    return Promise.resolve({ json: () => Promise.resolve(oneMeal) });
  } return fetchMock2(url);
};

export default fetchMock;

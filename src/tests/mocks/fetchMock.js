
const drinks = require('../../../cypress/mocks/drinks');
const oneMeal = require('../../../cypress/mocks/oneMeal');
const oneDrink = require('../../../cypress/mocks/oneDrink');
const meals = require('../../../cypress/mocks/meals');
const soupMeals = require('../../../cypress/mocks/soupMeals');
const beefMeals = require('../../../cypress/mocks/beefMeals');
const oneLetterMeal = require('./oneLetterFood');
const oneLetterDrink = require('./oneLetterDrinks');
const ginDrink = require('../../../cypress/mocks/ginDrinks');
const emptyMeals = require('../../../cypress/mocks/emptyMeals');
const cocoaDrinks = require('../../../cypress/mocks/cocoaDrinks');
const emptyDrinks = require('../../../cypress/mocks/emptyDrinks');

const fetchMock2 = (url) => {
  if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')) {
    return Promise.resolve({ json: () => Promise.resolve(drinks) });
  } if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=')) {
    return Promise.resolve({ json: () => Promise.resolve(oneDrink) });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/random.php') {
    return Promise.resolve({ json: () => Promise.resolve(oneMeal) });
  } if (url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php') {
    return Promise.resolve({ json: () => Promise.resolve(oneDrink) });
  }
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
    return Promise.resolve({ json: () => Promise.resolve(oneLetterDrink) });
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

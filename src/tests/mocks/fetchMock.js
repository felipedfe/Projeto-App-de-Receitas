const { drinks } = require('../../../cypress/mocks/drinks');
const oneMeal = require('../../../cypress/mocks/oneMeal');
const oneDrink = require('../../../cypress/mocks/oneDrink');
const meals = require('../../../cypress/mocks/meals');

const fetchMock = (url) => {
  if (url.includes('https://www.themealdb.com/api/json/v1/1/lookup.php?i=')) {
    return Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    });
  } if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')) {
    return Promise.resolve({
      json: () => Promise.resolve({ drinks }),
    });
  } if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=')) {
    return Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    });
  } if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(meals),
    });
  }
};

export default fetchMock;

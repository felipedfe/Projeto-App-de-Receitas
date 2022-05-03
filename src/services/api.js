// Meals
export const getMealByName = async (name) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getMealByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getMealByFirstLetter = async (letter) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('ERRO: ', error);
    return error;
  }
};

// Drinks
export const getDrinkByName = async (name) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getDrinkByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getDrinkByFirstLetter = async (letter) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const loadingFoods = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const loadingDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getFoodByCategory = async (category) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getDrinksByCategory = async (category) => {
  try {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchDetails = async (type, id) => {
  try {
    let endpoint;
    switch (type) {
    case 'meal':
      endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      break;
    case 'drink':
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      break;
    default: return null;
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchRecipes = async (type) => {
  try {
    const endpoint = type === 'meal'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

/*
Comida Aleatoria
 */

export const getSurpriseFood = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

/*
Drink Aleatorio
 */
export const getSurpriseDrink = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

/* comidas ingredientes aleatorios */

export const aleatoryFoodsIngredients = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

/* drinks ingredientes aleatorios */

export const aleatoryDrinksIngredients = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

/* foods by nationality */

export const getFoodByNationality = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

/* Foods by area */
export const getFoodsByArea = async (param) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${param}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

/* get foods catogories */

export const getCategories = async () => {
  try {
    const response = await fetch('www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

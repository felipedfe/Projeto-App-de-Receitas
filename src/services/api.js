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

export const fetchDetails = async (type, id) => {
  let endpoint;
  switch (type) {
  case 'meal':
    endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    break;
  case 'cocktail':
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    break;
  default: return null;
  }
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const fetchRandom = async (type) => {
  const endpoint = type === 'meal'
    ? 'www.themealdb.com/api/json/v1/1/random.php'
    : 'www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const fetchRecipes = async (type) => {
  const endpoint = type === 'meal'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
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

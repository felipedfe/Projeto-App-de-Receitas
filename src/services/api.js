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

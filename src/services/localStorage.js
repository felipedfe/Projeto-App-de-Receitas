const MEAL_TOKEN = 'mealsToken';
const COCKTAIL_TOKEN = 'cocktailsToken';
const USER = 'user';
const FAVORITE_RECIPES = 'favoriteRecipes';

// Adiciona token do meal
export const addMealToken = (token) => {
  localStorage.setItem(MEAL_TOKEN, token);
};

// Adiciona token do coquetel
export const addCocktailToken = (token) => {
  localStorage.setItem(COCKTAIL_TOKEN, token);
};

// busca token do meal ou do coquetel
export const getToken = (value) => {
  let token;
  switch (value) {
  case 'meal':
    token = localStorage.getItem(MEAL_TOKEN);
    return parseFloat(token);
  case 'cocktail':
    token = localStorage.getItem(COCKTAIL_TOKEN);
    return parseFloat(token);
  default: return null;
  }
};

// Adiciona o usuário
export const addUser = (email) => {
  localStorage.setItem(USER, JSON.stringify({ email }));
};

// busca o usuário
export const getUser = () => {
  const user = JSON.parse(localStorage.getItem(USER));
  return user;
};

// limpa o localStorage
export const cleanLocalStorage = () => {
  localStorage.removeItem(MEAL_TOKEN);
  localStorage.removeItem(COCKTAIL_TOKEN);
  localStorage.removeItem(USER);
  localStorage.removeItem(FAVORITE_RECIPES);
};

// adiciona receita aos favoritos
export const addFavorite = (recipe) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
  const newFavorites = [...favorites, recipe];
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(newFavorites));
  console.log(localStorage);
};

// remove receita dos favoritos
export const removeFromFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
  const newFavorites = favorites.filter((recipe) => recipe.id !== id);
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(newFavorites));
};

// busca receitas favoritas
export const getFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
  return favorites;
};

const MEAL_TOKEN = 'mealsToken';
const COCKTAIL_TOKEN = 'cocktailsToken';
const USER = 'user';
const FAVORITE_RECIPES = 'favoriteRecipes';
const IN_PROGRESS = 'inProgressRecipes';
const DONE_RECIPES = 'doneRecipes';

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
export const cleanLocalStorage = () => localStorage.clear();

// adiciona receita aos favoritos
export const addFavorite = (recipe) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
  const newFavorites = [...favorites, recipe];
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(newFavorites));
};

// remove receita dos favoritos
export const removeFromFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
  const newFavorites = favorites.filter((recipe) => recipe.id !== id);
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(newFavorites));
};

// busca receitas favoritas
export const getFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE_RECIPES)) || [];
  return favorites;
};

// busca recitas em progresso
export const getInProgressRecipes = () => {
  const recipes = JSON.parse(localStorage.getItem(IN_PROGRESS))
    || { cocktails: {}, meals: {} };
  return recipes;
};

// adiciona receita em progresso
export const addInProgressRecipe = (type, id, ingredients) => {
  const recipes = JSON.parse(localStorage.getItem(IN_PROGRESS))
    || { cocktails: {}, meals: {} };
  const newRecipes = { ...recipes, [type]: { ...recipes[type], [id]: ingredients } };
  localStorage.setItem(IN_PROGRESS, JSON.stringify(newRecipes));
};

// busca receitas acabadas
export const getDoneRecipes = () => {
  const recipes = JSON.parse(localStorage.getItem(DONE_RECIPES)) || [];
  return recipes;
};

// finaliza receita
export const addDoneRecipes = (recipe) => {
  const recipes = JSON.parse(localStorage.getItem(DONE_RECIPES)) || [];
  const newRecipes = [...recipes, recipe];
  localStorage.setItem(DONE_RECIPES, JSON.stringify(newRecipes));
};

addDoneRecipes({
  idDrink: '15997',
  strDrink: 'GG',
  strDrinkAlternate: null,
  strTags: null,
  strVideo: null,
  strCategory: 'Ordinary Drink',
  strAlcoholic: 'Optional alcohol',
  strGlass: 'Collins Glass',
});

const MEAL_TOKEN = 'mealsToken';
const COCKTAIL_TOKEN = 'cocktailsToken';
const USER = 'user';

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

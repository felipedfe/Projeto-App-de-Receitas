import oneDrink from '../../../cypress/mocks/oneDrink';
import oneMeal from '../../../cypress/mocks/oneMeal';

const drink = oneDrink.drinks[0];
const meal = oneMeal.meals[0];

export const doneDrink = {
  id: drink.idDrink,
  type: 'cocktail',
  nationality: '',
  category: drink.strCategory,
  alcoholicOrNot: drink.strAlcoholic,
  name: drink.strDrink,
  image: drink.strDrinkThumb,
  doneDate: '02/05/2022 12:29:23',
  tags: drink.strTags,
};

export const doneMeal = {
  id: meal.idMeal,
  type: 'meal',
  nationality: meal.strArea,
  category: meal.strCategory,
  alcoholicOrNot: '',
  name: meal.strMeal,
  image: meal.strMealThumb,
  doneDate: '02/05/2022 12:29:23',
  tags: meal.strTags,
};

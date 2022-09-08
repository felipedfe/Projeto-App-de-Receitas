import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import drinks from '../../cypress/mocks/drinks';
import { addFavorite, getFavorites } from '../services/localStorage';

const FAVORITE_RECIPES_URL = '/favorite-recipes';
const FOOD_DRINK_IMG_ID = '0-horizontal-image';
const FILTERED_ALL = 3;

const mockRecipeCard = (id, category = false) => ({
  id,
  type: category ? 'food' : 'drink',
});

const mockFoodsRecipe = (recipe) => {
  const { idMeal } = recipe;
  const mockedCard = {
    id: idMeal,
    type: 'food',
  };
  // const mockedRecipeCard = mockRecipeCard(idMeal, strCategory);
  addFavorite(mockedCard);
};

const mockDrinksRecipe = (recipe) => {
  const { idDrink } = recipe;
  const mockedCard = {
    id: idDrink,
    type: 'drink',
  };
  addFavorite(mockedCard);
};

beforeEach(() => {
  localStorage.clear();
});

describe('test the Favorite Recipes page', () => {
  it('shows a food card on screen', async () => {
    const { history } = renderWithRouter(<App />);
    addFavorite(oneMeal.meals[0]);
    history.push(FAVORITE_RECIPES_URL);

    const foodCard = screen.getByTestId(FOOD_DRINK_IMG_ID);
    expect(foodCard).toBeInTheDocument();
  });
  it('shows a drink card on screen', async () => {
    const { history } = renderWithRouter(<App />);
    addFavorite(oneDrink.drinks[0]);
    history.push(FAVORITE_RECIPES_URL);
    const drinkCard = screen.getByTestId(FOOD_DRINK_IMG_ID);
    expect(drinkCard).toBeInTheDocument();
  });
  it('copies the URL link when the share button is pressed', async () => {
    const { history } = renderWithRouter(<App />);
    // Função retirada de: https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    mockFoodsRecipe(oneMeal.meals[0]);
    const favorite = getFavorites();
    const { id, type } = favorite[0];
    const URLlink = `${type}s/${id}`;

    history.push(FAVORITE_RECIPES_URL);

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    await act(async () => userEvent.click(shareBtn));
    expect(window.navigator.clipboard.writeText)
      .toHaveBeenCalledWith(`http://localhost:3000/${URLlink}`);
  });
  it('removes recipe from the favorites list when heart button is pressed', async () => {
    const { history } = renderWithRouter(<App />);
    addFavorite(oneDrink.drinks[0]);
    history.push(FAVORITE_RECIPES_URL);

    const unfavoriteBtn = screen.getByAltText(/heart/i);
    userEvent.click(unfavoriteBtn);
    const favorites = getFavorites();
    expect(favorites).toHaveLength(0);
  });
  it('shows three filter buttons (Foods, Drinks and All)', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(FAVORITE_RECIPES_URL);

    const foodsBtn = screen.getByTestId('filter-by-food-btn');
    expect(foodsBtn).toBeInTheDocument();

    const drinksBtn = screen.getByTestId('filter-by-drink-btn');
    expect(drinksBtn).toBeInTheDocument();

    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
  });
  it('filter recipes by button name', async () => {
    const { history } = renderWithRouter(<App />);
    mockFoodsRecipe(oneMeal.meals[0]);
    mockDrinksRecipe(drinks.drinks[0]);
    mockDrinksRecipe(drinks.drinks[1]);
    history.push(FAVORITE_RECIPES_URL);

    const foodsBtn = screen.getByTestId('filter-by-food-btn');
    userEvent.click(foodsBtn);
    const foodsList = screen.getAllByTestId(/horizontal-image/i);
    expect(foodsList).toHaveLength(1);

    const drinksBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinksBtn);
    const drinksList = screen.getAllByTestId(/horizontal-image/i);
    expect(drinksList).toHaveLength(2);

    const allBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allBtn);
    const allList = screen.getAllByTestId(/horizontal-image/i);
    expect(allList).toHaveLength(FILTERED_ALL);
  });
  it('redirects to the Details page when a image is clicked', async () => {
    const { history } = renderWithRouter(<App />);
    const { idMeal, strCategory } = oneMeal.meals[0];
    const mockedCard = mockRecipeCard(idMeal, strCategory);
    addFavorite(mockedCard);
    history.push(FAVORITE_RECIPES_URL);

    const image = screen.getByTestId(FOOD_DRINK_IMG_ID);
    userEvent.click(image);
    expect(history.location.pathname).toBe('/foods/52771');
  });
});

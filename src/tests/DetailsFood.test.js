import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal, { meals } from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import fetchMock from './mocks/fetchMock';
import App from '../App';
import listIngredients from './helpers/listIngredients';
import { addDoneRecipes, getDoneRecipes, getFavorites } from '../services/localStorage';
import shareImg from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const FOODS_PATH = '/foods';
const ONE_FOOD_PATH = '/foods/52771';
const PHOTO_ID = 'recipe-photo';
const TITLE_ID = 'recipe-title';
const SHARE_ID = 'share-btn';
const FAVORIT_ID = 'favorite-btn';
const CATEGORY_ID = 'recipe-category';
const INSTRUCTION_ID = 'instructions';
const VIDEO_ID = 'video';
const START_BTN = 'start-recipe-btn';

beforeEach(() => {
  localStorage.clear();
  window.fetch = jest.fn().mockImplementation(fetchMock);
});

const gotToFood = async (render) => {
  await render.history.push(FOODS_PATH);
  await render.history.push(ONE_FOOD_PATH);
};

describe('Tests the Food details page', () => {
  const ingredientsList = listIngredients(oneMeal.meals[0]);
  it('tests if the correct information is rendered', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    await waitForElement(() => screen.findByTestId(PHOTO_ID), { timeout: 5000 });
    expect(window.fetch).toHaveBeenCalled();
    const foodPhoto = await screen.findByTestId(PHOTO_ID);
    const foodName = screen.getByTestId(TITLE_ID);
    const shareBtn = screen.getByTestId(SHARE_ID);
    const likeBtn = screen.getByTestId(FAVORIT_ID);
    const category = screen.getByTestId(CATEGORY_ID);
    const ingredients = screen.getAllByTestId(/ingredient-name-and-measure/i);
    const instructions = screen.getByTestId(INSTRUCTION_ID);
    const video = screen.getByTestId(VIDEO_ID);
    const recomendationCards = screen.getAllByTestId(/recomendation-card/);
    const startRecipe = screen.getByTestId(START_BTN);
    expect(foodPhoto).toBeInTheDocument();
    expect(foodName).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(likeBtn).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    ingredients.forEach((item) => expect(item).toBeInTheDocument());
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    recomendationCards.forEach((item) => expect(item).toBeInTheDocument());
    expect(startRecipe).toBeInTheDocument();
  });
  it('verifies the enpoint of the API', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
  });
  it('verifies the information on screen', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    const penne = oneMeal.meals[0];
    const foodPhoto = await screen.findByTestId(PHOTO_ID);
    const foodName = screen.getByTestId(TITLE_ID);
    const category = screen.getByTestId(CATEGORY_ID);
    const ingredients = screen.getAllByTestId(/ingredient-name-and-measure/i);
    const instructions = screen.getByTestId(INSTRUCTION_ID);
    const video = screen.getByTestId(VIDEO_ID);
    const recomendationCards = screen.getAllByTestId(/recomendation-card/);
    expect(foodPhoto).toHaveAttribute('src', penne.strMealThumb);
    expect(foodPhoto).toHaveAttribute('alt', penne.strMeal);
    expect(foodName).toHaveTextContent(penne.strMeal);
    expect(category).toHaveTextContent(penne.strCategory);
    ingredients.forEach((item, index) => {
      expect(item).toHaveTextContent(ingredientsList[index]);
    });
    expect(instructions).toHaveTextContent(penne.strInstructions);
    expect(video.children[0]).toHaveAttribute('src', penne.strYoutube);
    recomendationCards.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
  it('verifies if the recommendations are for drinks', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    const recomendationTitle = screen.getAllByTestId(/recomendation-title/);
    expect(recomendationTitle[0]).not.toHaveTextContent(meals[0].strMeal);
    expect(window.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
  it('verifies the recomendation cards', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    const recomendationCards = screen.getAllByTestId(/recomendation-card/);
    const recomendationTitle = screen.getAllByTestId(/recomendation-title/);
    const RECOM_LENGTH = 6;
    expect(recomendationCards).toHaveLength(RECOM_LENGTH);
    recomendationCards.forEach((_item, index) => {
      const drink = drinks.drinks[index];
      expect(recomendationTitle[index]).toHaveTextContent(drinks.drinks[index].strDrink);
      expect(screen.getByAltText(drink.strDrink)).toBeInTheDocument();
    });
  });
  it('tests the cards buttons', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    const recomendationCards = screen.getAllByTestId(/recomendation-card/);
    await act(async () => {
      userEvent.click(recomendationCards[0]);
    });
    const cardId = drinks.drinks[0].idDrink;
    expect(render.history.location.pathname).toBe(`/drinks/${cardId}`);
  });
  it('tests the start button and the localStorage for recipes in progress', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    let startBtn = screen.getByTestId(START_BTN);
    expect(startBtn).toHaveTextContent(/start recipe/i);
    await act(async () => {
      userEvent.click(startBtn);
    });
    expect(render.history.location.pathname).toBe(`${ONE_FOOD_PATH}/in-progress`);
    await act(async () => {
      render.history.push(ONE_FOOD_PATH);
    });
    startBtn = screen.getByTestId(START_BTN);
    expect(startBtn).toHaveTextContent(/continue recipe/i);
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(Object.keys(inProgressStorage.meals)).toHaveLength(1);
  });
  it('verifies the start button and localStorage when the recipe is done', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      addDoneRecipes(oneMeal.meals[0]);
    });
    await act(async () => gotToFood(render));
    const doneRecipes = getDoneRecipes();
    expect(doneRecipes).toHaveLength(1);
    expect(screen.queryByTestId(START_BTN)).not.toBeInTheDocument();
  });
  it('tests the share button', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    const shareBtn = screen.getByTestId(SHARE_ID);
    expect(shareBtn).toHaveAttribute('src', shareImg);
  });
  it('tests the like button', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    let likeBtn = screen.getByTestId(FAVORIT_ID);
    expect(likeBtn).toHaveAttribute('src', whiteHeart);
    await act(async () => {
      userEvent.click(likeBtn);
    });
    likeBtn = screen.getByTestId(FAVORIT_ID);
    expect(likeBtn).toHaveAttribute('src', blackHeart);
    await act(async () => {
      render.history.push(FOODS_PATH);
      render.history.push(ONE_FOOD_PATH);
    });
    likeBtn = screen.getByTestId(FAVORIT_ID);
    expect(likeBtn).toHaveAttribute('src', blackHeart);
    await act(async () => {
      userEvent.click(likeBtn);
    });
    likeBtn = screen.getByTestId(FAVORIT_ID);
    expect(likeBtn).toHaveAttribute('src', whiteHeart);
  });
  it('tests favoriteRecipes on localStorage', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    let favoriteLocal = getFavorites();
    expect(favoriteLocal).toEqual([]);
    const likeBtn = screen.getByTestId(FAVORIT_ID);
    await act(async () => {
      userEvent.click(likeBtn);
    });
    favoriteLocal = getFavorites();
    expect(favoriteLocal).toHaveLength(1);
    expect(favoriteLocal[0].id).toBe(oneMeal.meals[0].idMeal);
    await act(async () => {
      userEvent.click(likeBtn);
    });
    favoriteLocal = getFavorites();
    expect(favoriteLocal).toHaveLength(0);
  });
});

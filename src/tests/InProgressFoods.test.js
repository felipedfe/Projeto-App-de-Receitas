import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import fetchMock from './mocks/fetchMock';
import App from '../App';
import listIngredients from './helpers/listIngredients';
import { getFavorites, getInProgressRecipes } from '../services/localStorage';
import shareImg from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const FOODS_PATH = '/foods';
const ONE_FOOD_PATH = '/foods/52771/in-progress';
const PHOTO_ID = 'recipe-photo';
const TITLE_ID = 'recipe-title';
const SHARE_ID = 'share-btn';
const FAVORIT_ID = 'favorite-btn';
const CATEGORY_ID = 'recipe-category';
const INSTRUCTION_ID = 'instructions';
const FINISH_BTN = 'finish-recipe-btn';

beforeEach(() => {
  localStorage.clear();
  window.fetch = jest.fn().mockImplementation(fetchMock);
});

const gotToFood = async (render) => {
  await render.history.push(FOODS_PATH);
  await render.history.push(ONE_FOOD_PATH);
};

const checkAllIngredients = async (ingredients) => {
  ingredients.forEach(async (item) => {
    await act(async () => {
      userEvent.click(item);
    });
  });
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
    const ingredients = screen.getAllByTestId(/ingredient-step/i);
    const instructions = screen.getByTestId(INSTRUCTION_ID);
    const finishRecipe = screen.getByTestId(FINISH_BTN);
    expect(foodPhoto).toBeInTheDocument();
    expect(foodName).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(likeBtn).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    ingredients.forEach((item) => expect(item).toBeInTheDocument());
    expect(instructions).toBeInTheDocument();
    expect(finishRecipe).toBeInTheDocument();
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
    const ingredients = screen.getAllByTestId(/ingredient-step/i);
    const instructions = screen.getByTestId(INSTRUCTION_ID);
    expect(foodPhoto).toHaveAttribute('src', penne.strMealThumb);
    expect(foodPhoto).toHaveAttribute('alt', penne.strMeal);
    expect(foodName).toHaveTextContent(penne.strMeal);
    expect(category).toHaveTextContent(penne.strCategory);
    ingredients.forEach((item, index) => {
      expect(item).toHaveTextContent(ingredientsList[index]);
    });
    expect(instructions).toHaveTextContent(penne.strInstructions);
  });
  it('vrifies if the items are type checkbox', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    const ingredients = screen.getAllByRole('checkbox');
    expect(ingredients).toHaveLength(ingredientsList.length);
  });
  it('verifies the style when the ingredient is checked', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    let ingredients = screen.getAllByTestId(/ingredient-step/i);
    await act(async () => {
      userEvent.click(ingredients[0]);
    });
    ingredients = screen.getAllByTestId(/ingredient-step/i);
    const ingredientsCheck = screen.getAllByRole('checkbox');
    expect(ingredientsCheck[0]).toBeChecked();
    expect(ingredients[0]).toHaveClass('checked');
  });
  it('tests if it\'s possible to check every item on the list', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    const ingredients = screen.getAllByTestId(/ingredient-step/i);
    await checkAllIngredients(ingredients);
    ingredients.forEach(async (_item, index) => {
      const checkedIng = screen.getAllByRole('checkbox');
      expect(checkedIng[index]).toBeChecked();
    });
  });
  it('verifies if the progress is saved', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    const ingredients = screen.getAllByTestId(/ingredient-step/i);
    await act(async () => {
      userEvent.click(ingredients[0]);
    });
    render.history.push(FOODS_PATH);
    render.history.push(ONE_FOOD_PATH);
    const checkedList = await screen.findAllByRole('checkbox');
    expect(checkedList[0]).toBeChecked();
    expect(checkedList[1]).not.toBeChecked();
    const inProgressStorage = getInProgressRecipes();
    expect(Object.keys(inProgressStorage.meals)).toHaveLength(1);
    expect(inProgressStorage.meals[oneMeal.meals[0].idMeal])
      .toHaveLength(ingredientsList.length);
  });
  it('tests the share button', async () => {
    let render;
    Object.assign(window.navigator, {
      clipboard: { writeText: jest.fn()
        .mockImplementation((text) => Promise.resolve(text)) },
    });
    await act(async () => { render = renderWithRouter(<App />); });
    await act(async () => gotToFood(render));
    const shareBtn = screen.getByTestId(SHARE_ID);
    expect(shareBtn).toHaveAttribute('src', shareImg);
    await act(async () => { userEvent.click(shareBtn); });
    const copiedPath = render.history.location.pathname.split('/in-progress').join('');
    const url = `http://localhost${copiedPath}`;
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(url);
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
  it('tests if the done recipe button is disabled', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    const ingredients = screen.getAllByTestId(/ingredient-step/i);
    const finishBtn = screen.getByTestId(FINISH_BTN);
    expect(finishBtn).toBeDisabled();
    await checkAllIngredients(ingredients);
    expect(finishBtn).not.toBeDisabled();
  });
  it('tests if the finish button redirect to the right page', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => gotToFood(render));
    const ingredients = screen.getAllByTestId(/ingredient-step/i);
    const finishBtn = screen.getByTestId(FINISH_BTN);
    expect(finishBtn).toBeDisabled();
    await checkAllIngredients(ingredients);
    await act(async () => {
      userEvent.click(finishBtn);
    });
    const { pathname } = render.history.location;
    expect(pathname).toBe('/done-recipes');
  });
});

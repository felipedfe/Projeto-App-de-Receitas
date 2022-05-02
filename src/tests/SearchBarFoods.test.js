import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../components/Provider';
import Foods from '../pages/Foods';
import fetchMock from './mocks/fetchMock';
import soupMeals from '../../cypress/mocks/soupMeals';

const SEARCH_BTN_ID = 'search-top-btn';
const SEARCH_INPUT_ID = 'search-input';
const RADIO_NAME_ID = 'name-search-radio';
const INGREDIENT_ID = 'ingredient-search-radio';
const FIRST_LETTER_ID = 'first-letter-search-radio';
const SEARCH_RECIPES_BTN_ID = 'exec-search-btn';
const FOOD_NAME = 'arrabiata';
const MORE_FOOD_NAME = 'soup';
const MAX_RECIPES_ON_SCREEN = 12;

const renderWithAct = async (history) => {
  await act(async () => {
    renderWithRouter(
      <Router history={ history }>
        <Provider>
          <Foods />
        </Provider>
      </Router>,
    );
  });
  history.push('/foods');
};

const openSearchBar = () => {
  const searchBbtn = screen.getByTestId(SEARCH_BTN_ID);
  expect(searchBbtn).toBeInTheDocument();
  userEvent.click(searchBbtn);
};

beforeEach(() => {
  window.fetch = jest.fn().mockImplementation(fetchMock);
  window.alert = jest.fn();
});

afterEach(() => jest.fn().mockClear());

describe('Test the Search Bar component for foods page', () => {
  it('tests if there is a Search Bar component on foods page', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    openSearchBar();
    const searchBar = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchBar).toBeInTheDocument();
  });
  it('tests the response when meal ingredient is selected', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    openSearchBar();
    const searchBarInput = screen.getByTestId(SEARCH_INPUT_ID);
    const ingredientRadio = screen.getByTestId(INGREDIENT_ID);
    const searchBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    userEvent.type(searchBarInput, 'beef');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);
    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=beef');
  });
  it('tests the response when meal first-letter is selected', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    openSearchBar();
    const searchBarInput = screen.getByTestId(SEARCH_INPUT_ID);
    const firstLetter = screen.getByTestId(FIRST_LETTER_ID);
    const searchBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    userEvent.type(searchBarInput, 'a');
    userEvent.click(firstLetter);
    userEvent.click(searchBtn);

    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
});

describe('Tests the unexpected response to foods page', () => {
  it('gets redirected to details page if only one recipe is found', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    history.push('/foods');
    openSearchBar();
    const searchBarInput = screen.getByTestId(SEARCH_INPUT_ID);
    const radioNameBtn = screen.getByTestId(RADIO_NAME_ID);
    expect(radioNameBtn).toBeInTheDocument();
    userEvent.click(radioNameBtn);
    expect(radioNameBtn.checked).toEqual(true);
    userEvent.type(searchBarInput, FOOD_NAME);
    const searchRecipesBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    expect(searchRecipesBtn).toBeInTheDocument();
    await act(async () => { userEvent.click(searchRecipesBtn); });
    expect(history.location.pathname).toMatch('/foods/52771');
  });
  it('tests if an alert apears if there is no recipe found', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    openSearchBar();
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    const nameRadio = screen.getByTestId(RADIO_NAME_ID);
    const searchBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    userEvent.type(searchInput, 'pizzas');
    userEvent.click(nameRadio);
    await act(async () => { userEvent.click(searchBtn); });
    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=pizzas');
    expect(window.alert).toHaveBeenCalled();
    expect(window.alert)
      .toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
  it('tests if there\'s an alert if more than one letter is typed', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    openSearchBar();
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    const firstLetter = screen.getByTestId(FIRST_LETTER_ID);
    const searchBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    userEvent.type(searchInput, 'aa');
    userEvent.click(firstLetter);
    await act(async () => { userEvent.click(searchBtn); });
    expect(window.fetch).toHaveBeenCalled();
  });
});

describe('Test the response of the searchBar to foods page', () => {
  it('shows a max of 12 recipes on food screen when more than one is found', async () => {
    const history = createMemoryHistory();

    await renderWithAct(history);
    openSearchBar();

    // Search Bar aparece na tela

    const searchBarInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchBarInput).toBeInTheDocument();
    // encontrando Radio button
    const radioNameBtn = screen.getByTestId(RADIO_NAME_ID);
    expect(radioNameBtn).toBeInTheDocument();
    userEvent.click(radioNameBtn);
    // Radio button é clicado
    expect(radioNameBtn.checked).toEqual(true);

    userEvent.type(searchBarInput, MORE_FOOD_NAME);
    const searchRecipesBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    expect(searchRecipesBtn).toBeInTheDocument();
    await act(async () => {
      userEvent.click(searchRecipesBtn);
    });

    const recipeCards = screen.getAllByTestId(/recipe-card/i);
    const images = screen.getAllByTestId(/card-img/i);
    const names = screen.getAllByTestId(/card-name/i);
    expect(recipeCards.length).toBeLessThanOrEqual(MAX_RECIPES_ON_SCREEN);
    recipeCards.forEach((item, index) => {
      expect(images[index]).toBeInTheDocument();
      expect(images[index]).toHaveAttribute('src', soupMeals.meals[index].strMealThumb);
      expect(names[index]).toBeInTheDocument();
      expect(names[index]).toHaveTextContent(soupMeals.meals[index].strMeal);
    });
  });
});

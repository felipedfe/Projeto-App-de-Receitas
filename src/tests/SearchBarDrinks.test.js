import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../components/Provider';
import Drinks from '../pages/Drinks';
import fetchMock from './mocks/fetchMock';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';

const SEARCH_BTN_ID = 'search-top-btn';
const SEARCH_INPUT_ID = 'search-input';
const RADIO_NAME_ID = 'name-search-radio';
const INGREDIENT_ID = 'ingredient-search-radio';
const FIRST_LETTER_ID = 'first-letter-search-radio';
const SEARCH_RECIPES_BTN_ID = 'exec-search-btn';
const MAX_RECIPES_ON_SCREEN = 12;

const renderWithAct = async (history) => {
  await act(async () => {
    renderWithRouter(
      <Router history={ history }>
        <Provider>
          <Drinks />
        </Provider>
      </Router>,
    );
  });
  history.push('/drinks');
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

describe('Test the Search Bar component for drinks page', () => {
  it('tests if there is a Search Bar component on drinks page', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    history.push('/drinks');
    openSearchBar();
    const searchBar = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchBar).toBeInTheDocument();
  });
  it('tests the response when drink ingredient is selected', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    history.push('/drinks');
    openSearchBar();
    const searchBarInput = screen.getByTestId(SEARCH_INPUT_ID);
    const ingredientRadio = screen.getByTestId(INGREDIENT_ID);
    const searchBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    userEvent.type(searchBarInput, 'gin');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin');
  });
  it('tests the response when drink first-letter is selected', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    await act(async () => { openSearchBar(); });
    const searchBarInput = screen.getByTestId(SEARCH_INPUT_ID);
    const firstLetter = screen.getByTestId(FIRST_LETTER_ID);
    const searchBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    userEvent.type(searchBarInput, 'a');
    userEvent.click(firstLetter);
    userEvent.click(searchBtn);

    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });
});

describe('Test the response of the search bar to drinks page', () => {
  it('shows a max of 12 recipes on drink screen', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    openSearchBar();
    const searchBarInput = screen.getByTestId(SEARCH_INPUT_ID);
    const radioNameBtn = screen.getByTestId(RADIO_NAME_ID);
    expect(radioNameBtn).toBeInTheDocument();
    userEvent.click(radioNameBtn);
    userEvent.type(searchBarInput, 'chocolate');
    const searchRecipesBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    expect(searchRecipesBtn).toBeInTheDocument();
    await act(async () => { userEvent.click(searchRecipesBtn); });
    const recipeCards = screen.getAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBeLessThanOrEqual(MAX_RECIPES_ON_SCREEN);
    recipeCards.forEach((_item, index) => {
      const image = screen.getByTestId(`${index}-card-img`);
      const name = screen.getByTestId(`${index}-card-name`);
      expect(image)
        .toHaveAttribute('src', cocoaDrinks.drinks[index].strDrinkThumb);
      expect(name).toHaveTextContent(cocoaDrinks.drinks[index].strDrink);
    });
  });
});

describe('Tests the unexpected response to drinks page', () => {
  it('gets redirected to details page if only one recipe is found', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    openSearchBar();
    const searchBarInput = screen.getByTestId(SEARCH_INPUT_ID);
    const radioNameBtn = screen.getByTestId(RADIO_NAME_ID);
    userEvent.click(radioNameBtn);
    userEvent.type(searchBarInput, 'aquamarine');
    const searchRecipesBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    expect(searchRecipesBtn).toBeInTheDocument();
    await act(async () => { userEvent.click(searchRecipesBtn); });
    expect(history.location.pathname).toMatch('/drinks/178319');
  });
  it('tests if an alert apears if there is no recipe found', async () => {
    const history = createMemoryHistory();
    await renderWithAct(history);
    openSearchBar();
    const searchInput = screen.getByTestId(SEARCH_INPUT_ID);
    const nameRadio = screen.getByTestId(RADIO_NAME_ID);
    const searchBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    userEvent.type(searchInput, 'chocolates');
    userEvent.click(nameRadio);
    await act(async () => { userEvent.click(searchBtn); });
    expect(window.fetch).toHaveBeenCalled();
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
    await act(async () => {
      userEvent.click(searchBtn);
    });
    expect(window.fetch).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});

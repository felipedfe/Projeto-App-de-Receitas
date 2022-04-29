import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../components/Provider';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';

const SEARCH_BTN_ID = 'search-top-btn';
const SEARCH_INPUT_ID = 'search-input';
const RADIO_NAME_ID = 'name-search-radio';
const SEARCH_RECIPES_BTN_ID = 'exec-search-btn';
const FOOD_NAME = 'arrabiata';
const MAX_API_RETURN_LENGTH = 25;
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
};

describe('Test the Search Bar component', () => {
  it('tests if there is a Search Bar component on foods page', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Foods />
      </Provider>,
    );
    history.push('/foods');
    const searchBbtn = screen.getByTestId(SEARCH_BTN_ID);
    expect(searchBbtn).toBeInTheDocument();
    userEvent.click(searchBbtn);
    const searchBar = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchBar).toBeInTheDocument();
  });
  it('tests if there is a Search Bar component on drinks page', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
    history.push('/drinks');
    const searchBbtn = screen.getByTestId(SEARCH_BTN_ID);
    expect(searchBbtn).toBeInTheDocument();
    userEvent.click(searchBbtn);
    const searchBar = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchBar).toBeInTheDocument();
  });
  it('gets redirected to details page if only one recipe is found', async () => {
    const history = createMemoryHistory();

    await act(async () => {
      renderWithRouter(
        <Router history={ history }>
          <Provider>
            <Foods />
          </Provider>
        </Router>,
      );
    });

    const meal = {
      meals: [{ idMeal: '52771', strMeal: FOOD_NAME }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meal),
    });

    history.push('/foods');
    const searchBbtn = screen.getByTestId(SEARCH_BTN_ID);
    expect(searchBbtn).toBeInTheDocument();
    userEvent.click(searchBbtn);
    // Search Bar aparece na tela
    const searchBarInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchBarInput).toBeInTheDocument();
    // encontrando Radio button
    const radioNameBtn = screen.getByTestId(RADIO_NAME_ID);
    expect(radioNameBtn).toBeInTheDocument();
    userEvent.click(radioNameBtn);
    // Radio button é clicado
    expect(radioNameBtn.checked).toEqual(true);

    userEvent.type(searchBarInput, FOOD_NAME);
    const searchRecipesBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    expect(searchRecipesBtn).toBeInTheDocument();
    await act(async () => {
      userEvent.click(searchRecipesBtn);
    });

    expect(history.location.pathname).toMatch('/foods/52771');
  });
  it('shows a maximum of 12 recipes on screen when more than one is found', async () => {
    const history = createMemoryHistory();

    const mockedMealsArray = [];
    for (let i = 0; i < MAX_API_RETURN_LENGTH; i += 1) {
      mockedMealsArray.push({
        idMeal: i,
        strMeal: 'teste',
        strMealThumb: 'teste',
      });
    }
    const mockedMealsAPIReturn = { meals: mockedMealsArray };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedMealsAPIReturn),
    });

    await renderWithAct(history);

    history.push('/foods');
    const searchBbtn = screen.getByTestId(SEARCH_BTN_ID);
    expect(searchBbtn).toBeInTheDocument();
    userEvent.click(searchBbtn);
    // Search Bar aparece na tela
    const searchBarInput = screen.getByTestId(SEARCH_INPUT_ID);
    expect(searchBarInput).toBeInTheDocument();
    // encontrando Radio button
    const radioNameBtn = screen.getByTestId(RADIO_NAME_ID);
    expect(radioNameBtn).toBeInTheDocument();
    userEvent.click(radioNameBtn);
    // Radio button é clicado
    expect(radioNameBtn.checked).toEqual(true);

    userEvent.type(searchBarInput, FOOD_NAME);
    const searchRecipesBtn = screen.getByTestId(SEARCH_RECIPES_BTN_ID);
    expect(searchRecipesBtn).toBeInTheDocument();
    await act(async () => {
      userEvent.click(searchRecipesBtn);
    });

    const allImagesOnScreen = screen.getAllByAltText('teste');
    expect(allImagesOnScreen.length).toEqual(MAX_RECIPES_ON_SCREEN);
  });
});

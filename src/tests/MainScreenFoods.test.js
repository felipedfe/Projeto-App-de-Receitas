import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import fetchMock from './mocks/fetchMock';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import goatMeals from '../../cypress/mocks/goatMeals';
import beefMeals from '../../cypress/mocks/beefMeals';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import App from '../App';

const CATEGORYOPTIONFOODS = ['All', 'Beef', 'Goat', 'Chicken', 'Breakfast', 'Dessert'];
const ONE_FOOD_CLICK = '52977';
const MAX_LENGTH_NUMBER = 12;
const SHOULD_NOT_BE_ID = '12-card-img';
const BEEF_ID = 'Beef-category-filter';
const BREAKFAST_ID = 'Breakfast-category-filter';
const GOAT_ID = 'Goat-category-filter';
const CHICKEN_ID = 'Chicken-category-filter';
const ALL_ID = 'All-category-filter';

const category = async () => {
  CATEGORYOPTIONFOODS.forEach((cat) => {
    const getCategory = screen.queryByTestId(`${cat}-category-filter`);
    expect(getCategory).toBeInTheDocument();
    expect(getCategory).toHaveTextContent(cat);
  });
};

const getFirstTwelve = (response) => {
  const gettingTwelve = screen.getAllByTestId(/recipe-card/i);
  expect(gettingTwelve.length).toBeLessThanOrEqual(MAX_LENGTH_NUMBER);
  response.forEach((item, index) => {
    const getTitle = screen.getByTestId(`${index}-card-name`);
    const getImage = screen.getByTestId(`${index}-card-img`);
    expect(getTitle).toHaveTextContent(item.strMeal);
    expect(getImage).toHaveAttribute('src', item.strMealThumb);
  });
};
afterEach(() => jest.fn().mockClear());

beforeEach(() => { window.fetch = jest.fn(fetchMock); });

describe('Test the Foods Pages', () => {
  it('checks if there is 12 cards from the first 12 Foods recipes', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
      render.history.push('/foods');
    });
    const gettingMeal = meals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
    expect(window.fetch).toHaveBeenCalled();
    const notBeScreen = screen.queryByTestId(SHOULD_NOT_BE_ID);
    expect(notBeScreen).not.toBeInTheDocument();
  });
});
describe('Check the category buttons on Foods Pages ', () => {
  it('checks if there is 5 buttons with the 5 first categories from food', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
      render.history.push('/foods');
    });
    category();
  });
});

describe('Check the category filter ', () => {
  it('checks if the user clicks on Beef btn it shows the first 12 Beefs re', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
    });
    const beefBtn = screen.getByTestId(BEEF_ID);
    await act(async () => { userEvent.click(beefBtn); });
    expect(window.fetch).toHaveBeenCalled();
    const gettingMeal = beefMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
  });

  it('checks if the user clicks on Breakfast btn it shows the first 12 rec', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
      render.history.push('/foods');
    });

    const breakfastBtn = screen.getByTestId(BREAKFAST_ID);
    await act(async () => { userEvent.click(breakfastBtn); });
    const gettingMeal = breakfastMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
  });
  it('checks if the user clicks on Chicken btn shows the first 12 Chicken', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
      render.history.push('/foods');
    });

    const chickenBtn = screen.getByTestId(CHICKEN_ID);
    await act(async () => { userEvent.click(chickenBtn); });
    const gettingMeal = chickenMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
  });

  it('checks if there is a toggle on category btns n return without filter', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
      render.history.push('/foods');
    });
    const goatBtn = screen.getByTestId(GOAT_ID);
    await act(async () => { userEvent.click(goatBtn); });
    const gettingMeal = goatMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
    await act(async () => { userEvent.click(goatBtn); });
    const gettingMeals = meals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeals);
  });
  it('checks if one food category filter is selected one at a time ', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
      render.history.push('/foods');
    });
    const goatBtn = screen.getByTestId(GOAT_ID);
    expect(goatBtn).toBeInTheDocument();
    await act(async () => { userEvent.click(goatBtn); });
    const gettingMeal = goatMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);

    const beefBtn = screen.getByTestId(BEEF_ID);
    await act(async () => { userEvent.click(beefBtn); });
    gettingMeal.forEach((item) => {
      expect(screen.queryByText(item.strMeal)).not.toBeInTheDocument();
    });
  });

  it('checks if there is a btn that filter All categories', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
      render.history.push('/foods');
    });
    const allBtn = screen.getByTestId(ALL_ID);
    await act(async () => { userEvent.click(allBtn); });
    const gettingMeal = meals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
  });

  it('checks if redirect to details recipes Pag by clicking on the card', async () => {
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
      render.history.push('/foods');
    });
    const gettingMeal = meals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
    const getMealId = gettingMeal[0].idMeal;
    expect(getMealId).toBe(ONE_FOOD_CLICK);
    const card = screen.getByTestId('0-recipe-card');
    await act(async () => { userEvent.click(card); });
    expect(render.history.location.pathname).toBe(`/foods/${getMealId}`);
  });
});

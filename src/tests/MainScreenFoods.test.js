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
  CATEGORYOPTIONFOODS.forEach((categoryy) => {
    const getCategory = screen.getByTestId(`${categoryy}-category-filter`);
    expect(getCategory).toBeInTheDocument();
  });
};

const fetchResolveGoat = () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(goatMeals),
  }));
};

const fetchResolveBeef = () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(beefMeals),
  }));
};

const getFirstTwelve = async (response) => {
  response.forEach((item, index) => {
    const gettingTwelve = screen.getByTestId(`${index}-recipe-card`);
    expect(gettingTwelve).toBeInTheDocument();
    const getTitle = screen.getByTestId(`${index}-card-name`);
    const getImage = screen.getByTestId(`${index}-card-img`);
    expect(getTitle).toHaveTextContent(item.strMeal);
    expect(getImage).toHaveAttribute('src', item.strMealThumb);
  });
};
afterEach(() => {
  jest.fn().mockClear();
});
// beforeEach(() => {
//   window.fetch = jest.fn().mockImplementation(fetchMock);
// });
describe('Test the Foods Pages', () => {
  it('checks if there is 12 cards from the first 12 Foods recipes', async () => {
    window.fetch = jest.fn().mockImplementation(fetchMock);
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });

    await act(async () => render.history.push('/foods'));
    const gettingMeal = meals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
    expect(window.fetch).toHaveBeenCalled();
    const notBeScreen = screen.queryByTestId(SHOULD_NOT_BE_ID);
    expect(notBeScreen).not.toBeInTheDocument();
  });
});
describe('Check the category buttons on Foods Pages ', () => {
  it('checks if there is 5 buttons with the 5 first categories from food', async () => {
    window.fetch = jest.fn().mockImplementation(fetchMock);
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => render.history.push('/foods'));
    category();
  });
});

describe('Check the category filter ', () => {
  it('checks if the user clicks on Beef btn it shows the first 12 Beefs re', async () => {
    fetchResolveBeef();
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/foods');
    });

    const beefBtn = screen.getByTestId(BEEF_ID);
    await act(async () => {
      userEvent.click(beefBtn);
    });
    const gettingMeal = beefMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
  });

  it('checks if the user clicks on Breakfast btn it shows the first 12 rec', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(breakfastMeals),
    }));
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/foods');
    });

    const breakfastBtn = screen.getByTestId(BREAKFAST_ID);
    await act(async () => {
      userEvent.click(breakfastBtn);
    });
    const gettingMeal = breakfastMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
  });
  it('checks if the user clicks on Chicken btn shows the first 12 Chicken', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(chickenMeals),
    }));
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => render.history.push('/foods'));

    const chickenBtn = screen.getByTestId(CHICKEN_ID);
    await act(async () => {
      userEvent.click(chickenBtn);
    });
    const gettingMeal = chickenMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
  });

  it('checks if there is a toggle on category btns n return without filter', async () => {
    fetchResolveGoat();
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => render.history.push('/foods'));
    const goatBtn = screen.getByTestId(GOAT_ID);
    await act(async () => {
      userEvent.click(goatBtn);
    });
    const gettingMeal = goatMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);

    fetchResolve();
    await act(async () => {
      userEvent.click(goatBtn);
    });
    const gettingMeals = meals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeals);
  });
  it('checks if one food category filter is selected one at a time ', async () => {
    fetchResolveGoat();
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => render.history.push('/foods'));
    const goatBtn = screen.getByTestId(GOAT_ID);
    expect(goatBtn).toBeInTheDocument();
    await act(async () => {
      userEvent.click(goatBtn);
    });
    const gettingMeal = goatMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);

    const beefBtn = screen.getByTestId(BEEF_ID);
    await act(async () => {
      userEvent.click(beefBtn);
    });
    fetchResolveBeef();
    const gettingMeals = beefMeals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeals);
  });

  it('checks if there is a btn that filter All categories', async () => {
    window.fetch = jest.fn().mockImplementation(fetchMock);
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/foods');
    });
    const allBtn = screen.getByTestId(ALL_ID);
    await act(async () => {
      userEvent.click(allBtn);
    });
    const gettingMeal = meals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
  });

  it('checks if redirect to details recipes Pag by clicking on the card', async () => {
    window.fetch = jest.fn().mockImplementation(fetchMock);
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/foods');
    });
    const gettingMeal = meals.meals.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingMeal);
    const getMealId = gettingMeal[0].idMeal;
    expect(getMealId).toBe(ONE_FOOD_CLICK);
    await act(async () => {
      userEvent.click(getMealId);
    });
    expect(render.history.location.pathname).toBe(`/foods/${getMealId}`);
  });
});

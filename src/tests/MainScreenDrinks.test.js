import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import otherDrinks from '../../cypress/mocks/otherDrinks';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import fetchMock from './mocks/fetchMock';
import drinks from '../../cypress/mocks/drinks';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const CATEGORYOPTIONDRINKS = ['All', 'Ordinary Drink', 'Cocktail',
  'Other/Unknown', 'Cocoa', 'Milk / Float / Shake'];
const ONE_DRINK_CLICK = '15997';
const MAX_LENGTH_NUMBER = 12;
const SHOULD_NOT_BE_ID = '12-card-img';
const COCKTAIL_ID = 'Cocktail-category-filter';
const COCOA_ID = 'Cocoa-category-filter';
const ORDINARYDRINKS_ID = 'Ordinary Drink-category-filter';
const OTHER = 'Other/Unknown-category-filter';
const ALL_ID = 'All-category-filter';

const category = () => {
  CATEGORYOPTIONDRINKS.forEach((categoryy) => {
    const getCategory = screen.getByTestId(`${categoryy}-category-filter`);
    expect(getCategory).toBeInTheDocument();
  });
};
const fetchResolveOrdinary = () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(ordinaryDrinks),
  }));
};
const fetchResolveOther = () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(otherDrinks),
  }));
};
const fetchResolveCocoa = () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(cocoaDrinks),
  }));
};

const getFirstTwelve = async (response) => {
  response.forEach((item, index) => {
    const gettingTwelve = screen.getByTestId(`${index}-recipe-card`);
    expect(gettingTwelve).toBeInTheDocument();
    const getTitle = screen.getByTestId(`${index}-card-name`);
    const getImage = screen.getByTestId(`${index}-card-img`);
    expect(getTitle).toHaveTextContent(item.strDrink);
    expect(getImage).toHaveAttribute('src', item.strDrinkThumb);
  });
};

afterEach(() => {
  jest.fn().mockClear();
});
describe('Test the Drinks Pages', () => {
  it('checks if there is 12 cards from the first 12 Drinks recipes', async () => {
    window.fetch = jest.fn().mockImplementation(fetchMock);
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => render.history.push('/drinks'));

    const gettingDrinks = drinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrinks);
    expect(window.fetch).toHaveBeenCalled();
    const notBeScreen = screen.queryByTestId(SHOULD_NOT_BE_ID);
    expect(notBeScreen).not.toBeInTheDocument();
  });
});

describe('Check the category buttons on Main Pages ', () => {
  it('checks if there is 5 buttons with the 5 first categories from drink', async () => {
    window.fetch = jest.fn().mockImplementation(fetchMock);
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });

    await act(async () => render.history.push('/drinks'));
    category();
  });
});

describe('Check the category filter ', () => {
  it('checks if the user clicks on Ordinary btn it shows the first 12 Orde', async () => {
    fetchResolveOther();
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/drinks');
    });

    const ordinaryBtn = screen.getByTestId(ORDINARYDRINKS_ID);
    await act(async () => {
      userEvent.click(ordinaryBtn);
    });
    const gettingDrink = otherDrinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrink);
  });
  it('checks if the user clicks on Other btn it shows the first 12 Other', async () => {
    fetchResolveOrdinary();
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/drinks');
    });

    const otherBtn = screen.getByTestId(OTHER);
    await act(async () => {
      userEvent.click(otherBtn);
    });
    const gettingDrink = ordinaryDrinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrink);
  });
  it('checks if the user clicks on Cocoa btn it shows the first 12 Cocoa', async () => {
    fetchResolveCocoa();
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/drinks');
    });

    const cocoaBtn = screen.getByTestId(COCOA_ID);
    await act(async () => {
      userEvent.click(cocoaBtn);
    });
    const gettingDrink = cocoaDrinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrink);
  });
  it('checks if the user clicks on Cocktail btn it shows the first 12 Cock', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(cocktailDrinks),
    }));
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/drinks');
    });

    const cocktailBtn = screen.getByTestId(COCKTAIL_ID);
    await act(async () => {
      userEvent.click(cocktailBtn);
    });
    const gettingDrink = cocktailDrinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrink);
  });
  it('checks if there is a toggle on category btns n return without filter', async () => {
    fetchResolveCocoa();
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/drinks');
    });

    const cocoaBtn = screen.getByTestId(COCOA_ID);
    await act(async () => {
      userEvent.click(cocoaBtn);
    });
    const gettingDrinks = cocoaDrinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrinks);

    const otherBtn = screen.getByTestId(OTHER);
    await act(async () => {
      userEvent.click(otherBtn);
    });

    fetchResolveOther();
    const gettingDrink = ordinaryDrinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrink);
  });
  it('checks if one drink category filter is selected one at a time ', async () => {
    fetchResolveCocoa();
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/drinks');
    });

    const cocoaBtn = screen.getByTestId(COCOA_ID);
    await act(async () => {
      userEvent.click(cocoaBtn);
    });
    const gettingDrink = cocoaDrinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrink);
    await act(async () => {
      userEvent.click(cocoaBtn);
    });
    window.fetch = jest.fn().mockImplementation(fetchMock);
    const gettingDrinks = drinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrinks);
  });
  it('checks if there is a btn that filter All categories', async () => {
    window.fetch = jest.fn().mockImplementation(fetchMock);
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => render.history.push('/drinks'));

    const allBtn = screen.getByTestId(ALL_ID);
    await act(async () => {
      userEvent.click(allBtn);
    });
    const gettingDrinks = drinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrinks);
    expect(window.fetch).toHaveBeenCalled();
  });
  it('checks if redirect to details recipes Pag by clicking on the card', async () => {
    window.fetch = jest.fn().mockImplementation(fetchMock);
    let render;
    await act(async () => {
      render = renderWithRouter(<App />);
    });
    await act(async () => {
      render.history.push('/drinks');
    });
    const gettingDrink = drinks.drinks.slice(0, MAX_LENGTH_NUMBER);
    getFirstTwelve(gettingDrink);
    const getDrinkId = gettingDrink[0].idDrink;
    expect(getDrinkId).toBe(ONE_DRINK_CLICK);
    await act(async () => {
      userEvent.click(getDrinkId);
    });
    expect(render.history.location.pathname).toBe(`/drinks/${getDrinkId}`);
  });
});

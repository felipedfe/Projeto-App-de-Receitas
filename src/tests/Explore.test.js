import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';
import fetchMock from './mocks/fetchMock';

const btnExploreFoods = 'explore-foods';
const btnExploreDrinks = 'explore-drinks';
const SURPRISE_ID = 'explore-surprise';
const NATIONALITY_ID = 'explore-by-nationality';
const INGREDIENTS_ID = 'explore-by-ingredient';

const exploreDrink = '/explore/drinks';

const goToExploreFoods = (history) => {
  history.push('/explore');
  const foodsBtn = screen.getByTestId(btnExploreFoods);
  userEvent.click(foodsBtn);
};

const goToExploreDrinks = (history) => {
  history.push('/explore');
  const drinksBtn = screen.getByTestId(btnExploreDrinks);
  userEvent.click(drinksBtn);
};

afterEach(() => jest.fn().mockClear());

describe('Test screen explore', () => {
  it('have two buttons with testid', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const btnFood = screen.getByTestId(btnExploreFoods);
    const btnDrink = screen.getByTestId(btnExploreDrinks);
    expect(btnFood).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
  });
  it('text in button', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const btnFood = screen.getByTestId(btnExploreFoods);
    const btnDrink = screen.getByTestId(btnExploreDrinks);
    expect(btnFood).toHaveTextContent(/explore foods/i);
    expect(btnDrink).toHaveTextContent(/explore drinks/i);
  });
});

describe('test if both buttons are redirecting', () => {
  it('test button explore foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const btnFood = screen.getByTestId(btnExploreFoods);
    await act(async () => { userEvent.click(btnFood); });
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods');
  });
  it('test button explore drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const btnDrink = screen.getByTestId(btnExploreDrinks);
    userEvent.click(btnDrink);
    const { pathname } = history.location;
    expect(pathname).toBe(exploreDrink);
  });
});

describe('Screen foods testing buttons redirects', () => {
  it('test explorefoods page', () => {
    const { history } = renderWithRouter(<App />);
    goToExploreFoods(history);
    const byIngredient = screen.getByTestId(INGREDIENTS_ID);
    const byNationality = screen.queryByTestId(NATIONALITY_ID);
    const surprise = screen.getByTestId(SURPRISE_ID);
    expect(byIngredient).toBeInTheDocument();
    expect(byIngredient).toHaveTextContent(/by ingredient/i);
    expect(byNationality).toBeInTheDocument();
    expect(byNationality).toHaveTextContent(/by nationality/i);
    expect(surprise).toBeInTheDocument();
    expect(surprise).toHaveTextContent(/surprise me/i);
  });
  it('click button By Ingredient,you are redirected to explorefoodsbyingredients', () => {
    const { history } = renderWithRouter(<App />);
    goToExploreFoods(history);
    const ingredientBtn = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    userEvent.click(ingredientBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods/ingredients');
  });
  it('click btn ByNationality,you are redirected to explorefoodsbynationality', () => {
    const { history } = renderWithRouter(<App />);
    goToExploreFoods(history);
    const nationalitytBtn = screen.getByRole('button', {
      name: /by nationality/i,
    });
    userEvent.click(nationalitytBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods/nationalities');
  });
  it('click btn surprise me,you are redirected to especific page with api', async () => {
    let render;
    window.fetch = jest.fn().mockImplementation(fetchMock);
    const result = oneMeal.meals[0].idMeal;
    await act(async () => {
      render = renderWithRouter(<App />);
      render.history.push('/foods');
    });
    goToExploreFoods(render.history);
    const surpriseMe = screen.getByTestId(SURPRISE_ID);
    await act(async () => { userEvent.click(surpriseMe); });
    expect(window.fetch).toHaveBeenCalled();
    const { pathname } = render.history.location;
    expect(pathname).toBe(`/foods/${result}`);
  });
});

describe('Test explore drinks page', () => {
  it('at page explore button Explore drinks redirects correctly', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const btnDrinkRedirect = screen.getByTestId(btnExploreDrinks);
    userEvent.click(btnDrinkRedirect);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks');
  });
  it('Page explore drinks have two buttons byIngredient and surpriseMe', () => {
    const { history } = renderWithRouter(<App />);
    goToExploreDrinks(history);
    const byIngredientBtn = screen.getByTestId(INGREDIENTS_ID);
    const surpriseMeBtn = screen.getByTestId(SURPRISE_ID);
    expect(byIngredientBtn).toBeInTheDocument();
    expect(byIngredientBtn).toHaveTextContent(/by ingredient/i);
    expect(surpriseMeBtn).toBeInTheDocument();
    expect(surpriseMeBtn).toHaveTextContent(/surprise me/i);
  });
  it('click button ByIngredient,you are redirected to exploreDrinksbyingredients', () => {
    const { history } = renderWithRouter(<App />);
    goToExploreDrinks(history);
    const ingredientButton = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    userEvent.click(ingredientButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks/ingredients');
  });
  it('click btn surprise me,go to page drinks with api', async () => {
    let render;
    window.fetch = jest.fn().mockImplementation(fetchMock);
    const result = oneDrink.drinks[0].idDrink;
    await act(async () => {
      render = renderWithRouter(<App />);
      render.history.push('/foods');
    });
    goToExploreDrinks(render.history);
    const surpriseBtn = screen.getByTestId(SURPRISE_ID);
    await act(async () => { userEvent.click(surpriseBtn); });
    expect(window.fetch).toHaveBeenCalled();
    const { pathname } = render.history.location;
    expect(pathname).toBe(`/drinks/${result}`);
  });
});

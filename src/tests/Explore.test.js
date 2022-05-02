import React from 'react';
import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import ExploreDrinks from '../pages/ExploreDrinks';

const btnExploreFoods = 'explore-foods';
const btnExploreDrinks = 'explore-drinks';

const exploreDrink = '/explore/drinks';

describe('Test screen explore', () => {
  afterEach(() => jest.clearAllMocks());
  it('have two buttons with testid', () => {
    renderWithRouter(<Explore />);
    const btnFood = screen.getByTestId(btnExploreFoods);
    const btnDrink = screen.getByTestId(btnExploreDrinks);
    expect(btnFood).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
  });
  it('text in button', () => {
    renderWithRouter(<Explore />);
    const btnFood = screen.getByRole('button', {
      name: /explore foods/i,
    });
    const btnDrink = screen.getByRole('button', {
      name: /explore drinks/i,
    });
    expect(btnFood).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
  });
});

describe('test if both buttons are redirecting', () => {
  it('test button explore foods', () => {
    const { history } = renderWithRouter(<Explore />);
    const btnFood = screen.getByTestId(btnExploreFoods);
    userEvent.click(btnFood);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods');
  });
  it('test button explore drinks', () => {
    const { history } = renderWithRouter(<Explore />);
    const btnDrink = screen.getByTestId(btnExploreDrinks);
    userEvent.click(btnDrink);
    const { pathname } = history.location;
    expect(pathname).toBe(exploreDrink);
  });
});

describe('Screen foods testing buttons redirects', () => {
  it('test explorefoods page', () => {
    renderWithRouter(<ExploreFoods />);
    const ingredientBtn = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    const nationalityBtn = screen.getByRole('button', {
      name: /by nationality/i,
    });
    const surpriseMebtn = screen.getByRole('button', {
      name: /surprise me!/i,
    });
    expect(ingredientBtn).toBeInTheDocument();
    expect(nationalityBtn).toBeInTheDocument();
    expect(surpriseMebtn).toBeInTheDocument();
  });
  it('click button By Ingredient,you are redirected to explorefoodsbyingredients', () => {
    const { history } = renderWithRouter(<ExploreFoods />);
    const ingredientBtn = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    userEvent.click(ingredientBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods/ingredients');
  });
  it('click btn ByNationality,you are redirected to explorefoodsbynationality', () => {
    const { history } = renderWithRouter(<ExploreFoods />);
    const nationalitytBtn = screen.getByRole('button', {
      name: /by nationality/i,
    });
    userEvent.click(nationalitytBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods/nationalities');
  });

  it('click btn surprise me,you are redirected to especific page with api', async () => {
    const history = createMemoryHistory();
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));
    const data = oneMeal.meals;
    const result = data[0].idMeal;
    await act(async () => {
      renderWithRouter(
        <Router history={ history }>
          <ExploreFoods />
        </Router>,
      );
    });
    const surpriseMe = screen.getByTestId('explore-surprise');
    await act(async () => {
      userEvent.click(surpriseMe);
    });
    expect(history.location.pathname).toBe(`/foods/${result}`);
  });
});

describe('Test explore drinks page', () => {
  it('at page explore button Explore drinks redirects correctly', () => {
    const { history } = renderWithRouter(<Explore />);
    const btnDrinkRedirect = screen.getByTestId(btnExploreDrinks);
    userEvent.click(btnDrinkRedirect);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks');
  });
  it('Page explore drinks have two buttons byIngredient and surpriseMe', () => {
    /* const history = createMemoryHistory();
    renderWithRouter(<Router history={ history }><ExploreDrinks /></Router>);
    expect(history.location.pathname).toBe(exploreDrink); */
    renderWithRouter(<ExploreDrinks />);
    const byIngredientBtn = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    const surpriseMeBtn = screen.getByRole('button', {
      name: /surprise me!/i,
    });
    expect(byIngredientBtn).toBeInTheDocument();
    expect(surpriseMeBtn).toBeInTheDocument();
  });
  it('click button ByIngredient,you are redirected to exploreDrinksbyingredients', () => {
    const { history } = renderWithRouter(<ExploreDrinks />);
    const ingredientButton = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    userEvent.click(ingredientButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks/ingredients');
  });
  it('click btn surprise me,go to page drinks with api', async () => {
    const history = createMemoryHistory();
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));
    const data = oneDrink.drinks;
    const result = data[0].idDrink;
    await act(async () => {
      renderWithRouter(
        <Router history={ history }>
          <ExploreDrinks />
        </Router>,
      );
    });
    const surpriseBtn = screen.getByTestId('explore-surprise');
    await act(async () => {
      userEvent.click(surpriseBtn);
    });
    expect(history.location.pathname).toBe(`/drinks/${result}`);
  });
});

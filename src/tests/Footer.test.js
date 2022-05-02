import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import App from '../App';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodsByIngredients from '../pages/ExploreFoodsByIngredients';
import ExploreDrinksByIngredients from '../pages/ExploreDrinksByIngredients';
import Profile from '../pages/Profile';

const EMAIL = 'test@test.com';
const PASSWORD = '1234567';

const drinkButtonTestId = 'drinks-bottom-btn';
const exploreButtonTestId = 'explore-bottom-btn';
const mealButtonTestId = 'food-bottom-btn';

const goToFood = () => {
  const emailInput = screen.getByRole('textbox');
  const passInput = screen.getByPlaceholderText(/password/i);
  const loginBtn = screen.getByRole('button', {
    name: /enter/i,
  });
  userEvent.type(emailInput, EMAIL);
  userEvent.type(passInput, PASSWORD);
  userEvent.click(loginBtn);
};

const footerIconsInPage = () => {
  const testDrinkButton = screen.getByTestId(drinkButtonTestId);
  const testExploreButton = screen.getByTestId(exploreButtonTestId);
  const testMealButton = screen.getByTestId(mealButtonTestId);
  const testFooter = screen.getByTestId('footer');
  expect(testFooter).toBeInTheDocument();
  expect(testDrinkButton).toBeInTheDocument();
  expect(testExploreButton).toBeInTheDocument();
  expect(testMealButton).toBeInTheDocument();
  const drinkImgIcon = screen.getByRole('img', {
    name: /drink icon/i,
  });
  const exploreImgIcon = screen.getByRole('img', {
    name: /explore icon/i,
  });
  const mealImgIcon = screen.getByRole('img', {
    name: /meal icon/i,
  });

  expect(drinkImgIcon).toBeInTheDocument();
  expect(exploreImgIcon).toBeInTheDocument();
  expect(mealImgIcon).toBeInTheDocument();
};

describe('Test Footer', () => {
  it('Test footer and buttons on screen', () => {
    const { history } = renderWithRouter(<App />);
    goToFood();

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
    const testFooterinScreen = screen.getByTestId('footer');
    expect(testFooterinScreen).toBeInTheDocument();
    const buttonDrinksinScreen = screen.getByTestId(drinkButtonTestId);
    expect(buttonDrinksinScreen).toBeInTheDocument();
    const buttonExploreinScreen = screen.getByTestId(exploreButtonTestId);
    expect(buttonExploreinScreen).toBeInTheDocument();
    const buttonFoodinScreen = screen.getByTestId(mealButtonTestId);
    expect(buttonFoodinScreen).toBeInTheDocument();
  });

  it('Test footer style and buttons icons', () => {
    renderWithRouter(<App />);
    goToFood();
    const testFooter = screen.getByTestId('footer');
    expect(testFooter).toBeInTheDocument();
    expect(testFooter).toHaveStyle('bottom:', '0px');
    expect(testFooter).toHaveStyle('position:', 'fixed');
    const drink = screen.getByTestId(drinkButtonTestId);
    const explore = screen.getByTestId(exploreButtonTestId);
    const meal = screen.getByTestId(mealButtonTestId);
    expect(drink).toHaveAttribute('src', drinkIcon);
    expect(explore).toHaveAttribute('src', exploreIcon);
    expect(meal).toHaveAttribute('src', mealIcon);
  });

  it('Test page Drinks with footer', () => {
    renderWithRouter(<App />);
    goToFood();
    const drinksBtn = screen.getByTestId(drinkButtonTestId);
    userEvent.click(drinksBtn);
    footerIconsInPage();
  });
  it('Test page Explore with footer', () => {
    renderWithRouter(<App />);
    goToFood();
    const exploreBtn = screen.getByTestId(exploreButtonTestId);
    userEvent.click(exploreBtn);
    footerIconsInPage();
  });
  it('Test page Explore Foods with footer', () => {
    renderWithRouter(<ExploreFoods />);
    footerIconsInPage();
  });
  it('Test page Explore Drinks with footer', () => {
    renderWithRouter(<ExploreDrinks />);
    footerIconsInPage();
  });
  it('Test page Explore Foods By Ingredients with footer', () => {
    renderWithRouter(<ExploreFoodsByIngredients />);
    footerIconsInPage();
  });
  it('Test page Explore Drinks By Ingredients with footer', () => {
    renderWithRouter(<ExploreDrinksByIngredients />);
    footerIconsInPage();
  });
  it('Test page Explore Foods By Ingredients with footer', () => {
    renderWithRouter(<ExploreDrinksByIngredients />);
    footerIconsInPage();
  });
  it('Test page Explore Foods By Nationality with footer', () => {
    renderWithRouter(<App />);
    goToFood();
    const exploreBtn = screen.getByTestId(exploreButtonTestId);
    userEvent.click(exploreBtn);
    const exploreFoodsBtn = screen.getByText(/explore foods/i);
    userEvent.click(exploreFoodsBtn);
    const foodsByNationality = screen.getByText(/by nationality/i);
    userEvent.click(foodsByNationality);
    footerIconsInPage();
  });
  it('Test page Explore Foods By Nationality with footer', () => {
    renderWithRouter(<Profile />);
    footerIconsInPage();
  });
});

describe('Tests if clicking on the buttons the person is redirected', () => {
  it('clicking on the drinks icon redirects the person to cocktails', () => {
    const { history } = renderWithRouter(<App />);
    goToFood();
    const drinkBtn = screen.getByRole('img', {
      name: /drink icon/i,
    });
    userEvent.click(drinkBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('clicking on the explore icon redirects the person to explore page', () => {
    const { history } = renderWithRouter(<App />);
    goToFood();
    const exploreBtn = screen.getByRole('img', {
      name: /explore icon/i,
    });
    userEvent.click(exploreBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore');
  });

  it('clicking on the meal icon redirects the person to foods page', () => {
    const { history } = renderWithRouter(<App />);
    goToFood();
    const mealBtn = screen.getByRole('img', {
      name: /meal icon/i,
    });
    userEvent.click(mealBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});

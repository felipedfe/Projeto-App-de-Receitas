import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import App from '../App';

const EMAIL = 'test@test.com';
const PASSWORD = '1234567';

const drinkButtonTestId = 'drinks-bottom-btn';
const exploreButtonTestId = 'explore-bottom-btn';
const mealButtonTestId = 'food-bottom-btn';

const goToFood = async () => {
  const emailInput = screen.getByRole('textbox');
  const passInput = screen.getByPlaceholderText(/password/i);
  const loginBtn = screen.getByRole('button', { name: /enter/i });
  userEvent.type(emailInput, EMAIL);
  userEvent.type(passInput, PASSWORD);
  await act(async () => { userEvent.click(loginBtn); });
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
  const drinkImgIcon = screen.getByRole('img', { name: /drink icon/i });
  const exploreImgIcon = screen.getByRole('img', { name: /explore icon/i });
  const mealImgIcon = screen.getByRole('img', { name: /meal icon/i });

  expect(drinkImgIcon).toHaveAttribute('src', drinkIcon);
  expect(exploreImgIcon).toHaveAttribute('src', exploreIcon);
  expect(mealImgIcon).toHaveAttribute('src', mealIcon);
};

describe('Test Footer', () => {
  it('Test footer and buttons on screen', async () => {
    const { history } = renderWithRouter(<App />);
    await goToFood();
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
  it('Test footer style and buttons icons', async () => {
    renderWithRouter(<App />);
    await goToFood();
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
  it('Test page Drinks with footer', async () => {
    renderWithRouter(<App />);
    await goToFood();
    const drinksBtn = screen.getByTestId(drinkButtonTestId);
    userEvent.click(drinksBtn);
    footerIconsInPage();
  });
  it('Test page Explore with footer', async () => {
    renderWithRouter(<App />);
    await goToFood();
    const exploreBtn = screen.getByTestId(exploreButtonTestId);
    userEvent.click(exploreBtn);
    footerIconsInPage();
  });
  it('Test page Explore Foods with footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');
    footerIconsInPage();
  });
  it('Test page Explore Drinks with footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    footerIconsInPage();
  });
  it('Test page Explore Foods By Ingredients with footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');
    footerIconsInPage();
  });
  it('Test page Explore Drinks By Ingredients with footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks/ingredients');
    footerIconsInPage();
  });
  it('Test page Explore Foods By Nationality with footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/nationalities');
    footerIconsInPage();
  });
  it('Test page Profile with footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    footerIconsInPage();
  });
});

describe('Tests if clicking on the buttons the person is redirected', () => {
  it('clicking on the drinks icon redirects the person to cocktails', () => {
    const { history } = renderWithRouter(<App />);
    goToFood();
    const drinkBtn = screen.getByRole('img', { name: /drink icon/i });
    userEvent.click(drinkBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('clicking on the explore icon redirects the person to explore page', () => {
    const { history } = renderWithRouter(<App />);
    goToFood();
    const exploreBtn = screen.getByRole('img', { name: /explore icon/i });
    userEvent.click(exploreBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore');
  });

  it('clicking on the meal icon redirects the person to foods page', () => {
    const { history } = renderWithRouter(<App />);
    goToFood();
    const mealBtn = screen.getByRole('img', { name: /meal icon/i });
    userEvent.click(mealBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});

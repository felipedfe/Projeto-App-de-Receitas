import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import renderWithRouter from './helpers/renderWithRouter';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import App from '../App';
import Explore from '../pages/Explore';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinksByIngredients from '../pages/ExploreDrinksByIngredients';
import ExploreFoodsByIngredients from '../pages/ExploreFoodsByIngredients';
import ExploreFoodsByNationality from '../pages/ExploreFoodsByNationality';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import ProgressFood from '../pages/ProgressFood';
import ProgressDrink from '../pages/ProgressDrink';
import DetailsFood from '../pages/DetailsFood';
import DetailsDrink from '../pages/DetailsDrink';

const PROFILE_BTN_ID = 'profile-top-btn';
const SEARCH_BTN_ID = 'search-top-btn';
const TITLE_ID = 'page-title';
const SEARCH_INPUT_ID = 'search-input';

describe('Test the Header page', () => {
  const hasNoHeader = async () => {
    const profileBtn = await screen.findByTestId(PROFILE_BTN_ID);
    const searchBtn = await screen.findByTestId(SEARCH_BTN_ID);
    const titleId = await screen.findByTestId(TITLE_ID);
    expect(profileBtn).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    expect(titleId).not.toBeInTheDocument();
  };

  const hasHeader = async (title, searchBtn = true) => {
    const profileBtn = await screen.findByTestId(PROFILE_BTN_ID);
    expect(profileBtn).toBeInTheDocument();
    expect(profileBtn).toHaveAttribute('src', profileIcon);

    const titleId = await screen.findByTestId(TITLE_ID);
    expect(titleId).toBeInTheDocument();
    expect(titleId).toHaveTextContent(title);

    if (searchBtn) {
      const searchBbtn = await screen.findByTestId(SEARCH_BTN_ID);
      expect(searchBbtn).toBeInTheDocument();
      expect(searchBbtn).toHaveAttribute('src', searchIcon);
    } else {
      const searchBbtn = await screen.findByTestId(SEARCH_BTN_ID);
      expect(searchBbtn).not.toBeInTheDocument();
    }
  };

  const oneClick = async () => {
    const searchBtn = await screen.findByTestId(SEARCH_BTN_ID);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(SEARCH_INPUT_ID).toBeInTheDocument();
  };

  const twoClicks = async () => {
    const searchBtn = await screen.findByTestId(SEARCH_BTN_ID);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(SEARCH_INPUT_ID).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(SEARCH_INPUT_ID).not.toBeInTheDocument();
  };

  const redirect = async () => {
    const profileBtn = await screen.findByTestId(PROFILE_BTN_ID);
    expect(profileBtn).toBeInTheDocument();

    userEvent.click(profileBtn);
    renderWithRouter(<Profile />);
  };

  it('check if there is a Header on Foods Page', () => {
    renderWithRouter(<Foods />);
    hasHeader('Foods');
  });

  it('check if there is a Header on Drinks Page', () => {
    renderWithRouter(<Drinks />);
    hasHeader('Drinks');
  });

  it('check if there is a Header on Explore Page', () => {
    renderWithRouter(<Explore />);
    hasHeader('Explore', false);
  });

  it('check if there is a Header on Explore Drinks Page', () => {
    renderWithRouter(<ExploreDrinks />);
    hasHeader('Explore Drinks', false);
  });

  it('check if there is a Header on Explore Foods Page', () => {
    renderWithRouter(<ExploreFoods />);
    hasHeader('Explore Foods', false);
  });

  it('check if there is a Header on Explore Drinks By Ingredients Page', () => {
    renderWithRouter(<ExploreDrinksByIngredients />);
    hasHeader('Explore Ingredients', false);
  });

  it('check if there is a Header on Explore Foods By Ingredients Page', () => {
    renderWithRouter(<ExploreFoodsByIngredients />);
    hasHeader('Explore Ingredients', false);
  });

  it('check if there is a Header on Explore Foods By Nationality Page', () => {
    renderWithRouter(<ExploreFoodsByNationality />);
    hasHeader('Explore Nationalities');
  });

  it('check if there is a Header on Profile Page', () => {
    renderWithRouter(<Profile />);
    hasHeader('Profile', false);
  });

  it('check if there is a Header on Done Recipes Page', () => {
    renderWithRouter(<DoneRecipes />);
    hasHeader('Done Recipes', false);
  });

  it('check if there is a Header on Favorite Recipes Page', () => {
    renderWithRouter(<FavoriteRecipes />);
    hasHeader('Favorite Recipes', false);
  });

  it('check if there is no Header on Login Page', () => {
    renderWithRouter(<App />);
    hasNoHeader();
  });

  it('check if there is no Header on Progress Food Page', () => {
    renderWithRouter(<ProgressFood />);
    hasNoHeader();
  });

  it('check if there is no Header on Progress Drink Page', () => {
    renderWithRouter(<ProgressDrink />);
    hasNoHeader();
  });

  it('check if there is no Header on Details Food Page', () => {
    renderWithRouter(<DetailsFood />);
    hasNoHeader();
  });

  it('check if there is no Header on Details Drink Page', () => {
    renderWithRouter(<DetailsDrink />);
    hasNoHeader();
  });

  it('checks if is redirected to Profile Page by clicking the btn Profile', async () => {
    renderWithRouter(<Foods />);
    redirect();
  });

  it('checks if the search input appears by clicking 1 time the btn Search', () => {
    renderWithRouter(<Foods />);
    oneClick();
  });

  it('checks if the input disappears by clicking the 2 time the btn Search', async () => {
    renderWithRouter(<Foods />);
    twoClicks();
  });
});

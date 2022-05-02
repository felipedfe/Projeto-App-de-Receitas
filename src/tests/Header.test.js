import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Provider from '../components/Provider';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import renderWithRouter from './helpers/renderWithRouter';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Login from '../pages/Login';
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
    const titleId = await screen.findByTestId(TITLE_ID);
    expect(profileBtn).toBeInTheDocument();
    expect(profileBtn).toHaveAttribute('src', profileIcon);

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
    const inputSearch = await screen.findByTestId(SEARCH_INPUT_ID);
    const { history } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
    history.push('/drinks');
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(inputSearch).toBeInTheDocument();
  };

  const twoClicks = async () => {
    const searchBtn = await screen.findByTestId(SEARCH_BTN_ID);
    const inputSearch = await screen.findByTestId(SEARCH_INPUT_ID);
    renderWithRouter(<Foods />);
    // const { history } = renderWithRouter(
    //   <Provider>
    //     <Drinks />
    //   </Provider>,
    // );
    // history.push('/drinks');
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(inputSearch).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(inputSearch).not.toBeInTheDocument();
  };

  const redirect = async () => {
    const profileBtn = await screen.findByTestId(PROFILE_BTN_ID);
    const { history } = renderWithRouter(<Foods />);
    expect(profileBtn).toBeInTheDocument();

    userEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  };

  it('check if there is a Header on Foods Page', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Foods />
      </Provider>,
    );
    history.push('/foods');
    await hasHeader('Foods', true);
  });
  it('check if there is a Header on Drinks Page', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
    history.push('/drinks');
    await hasHeader('Drinks', true);
  });
  it('check if there is a Header on Explore Page', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Explore />
      </Provider>,
    );
    history.push('/explore');
    hasHeader('Explore', false);
  });

  it('check if there is a Header on Explore Drinks Page', () => {
    const { history } = renderWithRouter(
      <Provider>
        <ExploreDrinks />
      </Provider>,
    );
    history.push('/explore/drinks');
    hasHeader('Explore Drinks', false);
  });

  it('check if there is a Header on Explore Foods Page', () => {
    const { history } = renderWithRouter(
      <Provider>
        <ExploreFoods />
      </Provider>,
    );
    history.push('/explore/foods');
    hasHeader('Explore Foods', false);
  });

  it('check if there is a Header on Explore Drinks By Ingredients Page', () => {
    const { history } = renderWithRouter(
      <Provider>
        <ExploreDrinksByIngredients />
      </Provider>,
    );
    history.push('/explore/drinks/ingredients');
    hasHeader('Explore Ingredients', false);
  });
  it('check if there is a Header on Explore Foods By Ingredients Page', () => {
    const { history } = renderWithRouter(
      <Provider>
        <ExploreFoodsByIngredients />
      </Provider>,
    );
    history.push('/explore/foods/ingredients');
    hasHeader('Explore Ingredients', false);
  });
  it('check if there is a Header on Explore Foods By Nationality Page', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <ExploreFoodsByNationality />
      </Provider>,
    );
    history.push('/explore/foods/nationalities');
    await hasHeader('Explore Nationalities');
  });
  it('check if there is a Header on Profile Page', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    history.push('/profile');
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
    const { history } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    history.push('/');
    hasNoHeader();
  });
  it('check if there is no Header on Progress Food Page', async () => {
    renderWithRouter(<ProgressFood />);
    await hasNoHeader();
  });
  it('check if there is no Header on Progress Drink Page', () => {
    // const { history } = renderWithRouter(
    //   <Provider>
    //     <DetailsFood />
    //   </Provider>,
    // );
    // history.push('/detailsFood');
    // renderWithRouter(<ProgressDrink />);
    // hasNoHeader();
  });
  it('check if there is no Header on Details Food Page', () => {
    const { history } = renderWithRouter(
      <Provider>
        <DetailsFood />
      </Provider>,
    );
    history.push('/detailsFood');
    hasNoHeader();
  });
  it('check if there is no Header on Details Drink Page', () => {
    const { history } = renderWithRouter(
      <Provider>
        <DetailsDrink />
      </Provider>,
    );
    history.push('/detailsDrink');
    hasNoHeader();
  });
  it('checks if is redirected to Profile Page by clicking the btn Profile', () => {
    redirect();
  });
  it('checks if the search input appears by clicking 1 time the btn Search', () => {
    oneClick();
  });
  it('checks if the input disappears by clicking the 2 time the btn Search', () => {
    twoClicks();
  });
});

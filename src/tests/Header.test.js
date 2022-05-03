import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from './mocks/fetchMock';

const PROFILE_BTN_ID = 'profile-top-btn';
const SEARCH_BTN_ID = 'search-top-btn';
const TITLE_ID = 'page-title';
const SEARCH_INPUT_ID = 'search-input';

beforeEach(() => {
  window.fetch = jest.fn(fetchMock);
});

afterEach(() => jest.fn().mockClear());

describe('Test the Header page', () => {
  const hasNoHeader = () => {
    expect(screen.queryByTestId(PROFILE_BTN_ID)).not.toBeInTheDocument();
    expect(screen.queryByTestId(SEARCH_BTN_ID)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TITLE_ID)).not.toBeInTheDocument();
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
      expect(screen.queryByTestId(SEARCH_BTN_ID)).not.toBeInTheDocument();
    }
  };

  it('check if there is a Header on Foods Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/foods'); });
    await hasHeader('Foods', true);
  });
  it('check if there is a Header on Drinks Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/drinks'); });
    await hasHeader('Drinks', true);
  });
  it('check if there is a Header on Explore Page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    await hasHeader('Explore', false);
  });
  it('check if there is a Header on Explore Drinks Page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    await hasHeader('Explore Drinks', false);
  });
  it('check if there is a Header on Explore Foods Page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');
    await hasHeader('Explore Foods', false);
  });
  it('check if there is a Header on Explore Drinks By Ingredients Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/explore/drinks/ingredients'); });
    await hasHeader('Explore Ingredients', false);
  });
  it('check if there is a Header on Explore Foods By Ingredients Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/explore/foods/ingredients'); });
    await hasHeader('Explore Ingredients', false);
  });
  it('check if there is a Header on Explore Foods By Nationality Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/explore/foods/nationalities'); });
    await hasHeader('Explore Nationalities');
  });
  it('check if there is a Header on Profile Page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    await hasHeader('Profile', false);
  });
  it('check if there is a Header on Done Recipes Page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    await hasHeader('Done Recipes', false);
  });
  it('check if there is a Header on Favorite Recipes Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/favorite-recipes'); });
    await hasHeader('Favorite Recipes', false);
  });
  it('check if there is no Header on Login Page', () => {
    renderWithRouter(<App />);
    hasNoHeader();
  });
  it('check if there is no Header on Progress Food Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/foods/52771/in-progress'); });
    hasNoHeader();
  });
  it('check if there is no Header on Progress Drink Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/drinks/178319/in-progress'); });
    hasNoHeader();
  });
  it('check if there is no Header on Details Food Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/foods/52771'); });
    hasNoHeader();
  });
  it('check if there is no Header on Details Drink Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/drinks/178319'); });
    hasNoHeader();
  });
  it('checks if is redirected to Profile Page by clicking the btn Profile', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/foods'); });
    const profileBtn = await screen.findByTestId(PROFILE_BTN_ID);
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  it('checks if the search input appears by clicking 1 time the btn Search', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/drinks'); });
    const searchBtn = await screen.findByTestId(SEARCH_BTN_ID);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const inputSearch = await screen.findByTestId(SEARCH_INPUT_ID);
    expect(inputSearch).toBeInTheDocument();
  });
  it('checks if the input disappears by clicking the 2 time the btn Search', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/foods'); });
    const searchBtn = await screen.findByTestId(SEARCH_BTN_ID);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const inputSearch = await screen.findByTestId(SEARCH_INPUT_ID);
    expect(inputSearch).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(inputSearch).not.toBeInTheDocument();
  });
});

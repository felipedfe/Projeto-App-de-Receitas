import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const EMAIL = 'ana@trybe.com';
const PASSWORD = '1234567';
const EMAIL_INPUT_ID = 'email-input';
const PASSWORD_INPUT_ID = 'password-input';
const PROFILE_BTN_ID = 'profile-top-btn';
const PROFILE_EMAIL_ID = 'profile-email';
const PROFILE_DONE_BTN_ID = 'profile-done-btn';
const PROFILE_FAVORITE_BTN_ID = 'profile-favorite-btn';
const PROFILE_LOGOUT_BTN_ID = 'profile-logout-btn';

const goToProfilePage = async (render) => {
  await render.history.push('./profile');
};

describe('Test the Profile Page', () => {
  it('tests the route of the page', () => {
    const { history } = renderWithRouter(<App />);
    // Digitando email e senha
    const emailInput = screen.getByTestId(EMAIL_INPUT_ID);
    userEvent.type(emailInput, EMAIL);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_ID);
    userEvent.type(passwordInput, PASSWORD);
    // Clicando em "Enter"
    const enterBtn = screen.getByRole('button');
    userEvent.click(enterBtn);

    const profileBtn = screen.getByTestId(PROFILE_BTN_ID);
    userEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  it('checks if the user\'s email appears on the screen', async () => {
    let render;
    await act(async () => { render = renderWithRouter(<App />); });
    await goToProfilePage(render);
    const email = screen.getByTestId(PROFILE_EMAIL_ID);
    expect(email).toBeInTheDocument();
  });
  it('checks if button "Done Recipes" appears on the screen', async () => {
    let render;
    await act(async () => { render = renderWithRouter(<App />); });
    await goToProfilePage(render);
    const doneRecipesBtn = screen.getByTestId(PROFILE_DONE_BTN_ID);
    expect(doneRecipesBtn).toBeInTheDocument();
  });
  it('checks if button "Favorite Recipes" appears on the screen', async () => {
    let render;
    await act(async () => { render = renderWithRouter(<App />); });
    await goToProfilePage(render);
    const favoriteRecipesBtn = screen.getByTestId(PROFILE_FAVORITE_BTN_ID);
    expect(favoriteRecipesBtn).toBeInTheDocument();
  });
  it('checks if button "Favorite Recipes" appears on the screen', async () => {
    let render;
    await act(async () => { render = renderWithRouter(<App />); });
    await goToProfilePage(render);
    const logoutBtn = screen.getByTestId(PROFILE_LOGOUT_BTN_ID);
    expect(logoutBtn).toBeInTheDocument();
  });
  it('checks if the page is redirected to the Done Recipes page', async () => {
    let render;
    await act(async () => { render = renderWithRouter(<App />); });
    await goToProfilePage(render);
    const logoutBtn = screen.getByTestId(PROFILE_DONE_BTN_ID);
    userEvent.click(logoutBtn);
    expect(render.history.location.pathname).toBe('/done-recipes');
  });
  it('checks if the page is redirected to the Favorite Recipes page', async () => {
    let render;
    await act(async () => { render = renderWithRouter(<App />); });
    await goToProfilePage(render);
    const logoutBtn = screen.getByTestId(PROFILE_FAVORITE_BTN_ID);
    userEvent.click(logoutBtn);
    expect(render.history.location.pathname).toBe('/favorite-recipes');
  });
  it('checks if the page is redirected to the Home page', async () => {
    let render;
    await act(async () => { render = renderWithRouter(<App />); });
    await goToProfilePage(render);
    const logoutBtn = screen.getByTestId(PROFILE_LOGOUT_BTN_ID);
    userEvent.click(logoutBtn);
    expect(render.history.location.pathname).toBe('/');
  });
});

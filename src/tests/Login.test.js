import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { getToken, getUser } from '../services/localStorage';

const EMAIL = 'test@test.com';
const PASSWORD = '1234567';
const INVALID_EMAIL = 'test@test';
const INVALID_PASSWORD = '123';
const PASSWORD_ID = 'password-input';

describe('Test the Login page', () => {
  it('tests the route of the page', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('tests if there is an email input', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getAllByRole('textbox')[0];
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('placeholder', 'E-mail');
    expect(emailInput).toHaveAttribute('type', 'email');
  });
  it('tests if there is a password input', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('placeholder', 'Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  it('tests if there is an Enter button', () => {
    renderWithRouter(<App />);
    const enterBtn = screen.getByRole('button');
    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toBeDisabled();
    expect(enterBtn).toHaveTextContent('Enter');
  });
  it('verifies if it\'s possible to write an email', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput.value).toBe('');
    userEvent.type(emailInput, EMAIL);
    expect(emailInput.value).toBe(EMAIL);
  });
  it('verifies if it\'s possible to type a password', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    expect(passwordInput.value).toBe('');
    userEvent.type(passwordInput, PASSWORD);
    expect(passwordInput.value).toBe(PASSWORD);
  });
  it('checks if the button is disabled when the email or passwor is invalid', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const sendBtn = screen.getByRole('button');
    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    expect(sendBtn).toBeDisabled();
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(sendBtn).toBeDisabled();
  });
  it('checks if the user is redirected when the form is submited', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const sendBtn = screen.getByRole('button');

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    expect(sendBtn).toBeEnabled();
    userEvent.click(sendBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
  it('checks the token in the localStorage', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const sendBtn = screen.getByRole('button');

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    expect(sendBtn).toBeEnabled();
    userEvent.click(sendBtn);

    const mealTokenStorage = getToken('meal');
    const drinkTokenStorage = getToken('cocktail');
    expect(mealTokenStorage).toBe(1);
    expect(drinkTokenStorage).toBe(1);
    const noParamStorage = getToken();
    expect(noParamStorage).toBeNull();
  });
  it('verifies if the user is saved in localStorage', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const sendBtn = screen.getByRole('button');

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    expect(sendBtn).toBeEnabled();
    userEvent.click(sendBtn);

    const expected = {
      email: EMAIL,
    };
    const userStorage = getUser();
    expect(userStorage).toEqual(expected);
  });
});

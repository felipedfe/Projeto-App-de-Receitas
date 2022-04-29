import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Test the Profile page', () => {
  it('tests the route of the page', () => {
    const { history } = renderWithRouter(<Profile />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});

import React from 'react';
import App from './App';
import renderWithRouter from './tests/helpers/renderWithRouter';

test('Farewell, front-end', () => {
  const { queryByText } = renderWithRouter(<App />);
  expect(queryByText(/TRYBE/i)).not.toBeInTheDocument();
});

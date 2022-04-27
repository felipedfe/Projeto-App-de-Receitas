import React, { useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../style/header.css';

function Header() {
  const [input, setInput] = useState(false);
  const [available, setAvailable] = useState(false);

  const location = useLocation();
  const pathRoute = location.pathname;

  let routeName = '';
  const arrayRoute = ['/foods', '/drinks', '/explore/foods/nationalities'];

  switch (pathRoute) {
  case '/foods':
    routeName = 'Foods';
    break;
  case '/drinks':
    routeName = 'Drinks';
    break;
  case '/explore':
    routeName = 'Explore';
    break;
  case '/explore/foods':
    routeName = 'Explore Foods';
    break;
  case '/explore/foods/nationalities':
    routeName = 'Explore Nationalities';
    break;
  case '/explore/drinks':
    routeName = 'Explore Drinks';
    break;
  case '/explore/drinks/ingredients':
    routeName = 'Explore Ingredients';
    break;
  case '/explore/foods/ingredients':
    routeName = 'Explore Ingredients';
    break;
  case '/profile':
    routeName = 'Profile';
    break;
  case '/done-recipes':
    routeName = 'Done Recipes';
    break;
  case '/favorite-recipes':
    routeName = 'Favorite Recipes';
    break;
  default:
    return null;
  }

  return (
    <section className="header-sect">
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ () => setAvailable(true) }
      >
        {available && <Redirect to="/profile" />}
        <img src={ profileIcon } alt="Profile" />
      </button>

      <p data-testid="page-title">{ routeName }</p>

      {arrayRoute.includes(pathRoute) && (
        <>
          <button
            type="button"
            src={ searchIcon }
            data-testid="search-top-btn"
            onClick={ () => setInput(!input) }
          >
            <img src={ searchIcon } alt="Search" />
          </button>

          {input && (
            <input
              type="text"
              data-testid="search-input"
              placeholder="Buscar"
            />
          )}
        </>
      )}
    </section>
  );
}

export default Header;

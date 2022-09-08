import React, { useContext, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { useLocation, Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../style/header.css';

function Header() {
  const { search, setSearch } = useContext(MyContext);
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
    <section className="header">
      <button
        type="button"
        src={ profileIcon }
        onClick={ () => setAvailable(true) }
      >
        {available && <Redirect to="/profile" />}
        <AiOutlineUser className="react-icon" />
      </button>

      <h1 className="page-title">
        { routeName }
      </h1>

      {arrayRoute.includes(pathRoute) && (
        <button
          type="button"
          src={ searchIcon }
          onClick={ () => setSearch(!search) }
        >
          <BsSearch className="react-icon" />
        </button>
      )}
    </section>
  );
}

export default Header;

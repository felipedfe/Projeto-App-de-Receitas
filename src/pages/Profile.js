import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUser, cleanLocalStorage } from '../services/localStorage';

function Profile(props) {
  const { email } = getUser();
  const { history } = props;

  const redirectToPage = (page) => {
    if (page === '/') cleanLocalStorage();
    history.push(`${page}`);
  };

  return (
    <section>
      <section className="header-sect">
        <Header />
      </section>
      <section className="profile-sect">
        <h2 data-testid="profile-email" className="profile-subtitle">{email}</h2>
        <section className="profile-buttons-container">
          <button
            className="explore-btn"
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => redirectToPage('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            className="explore-btn"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => redirectToPage('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            className="explore-btn"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => redirectToPage('/') }
          >
            Logout
          </button>
        </section>
      </section>
      <Footer />
    </section>
  );
}

Profile.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Profile;

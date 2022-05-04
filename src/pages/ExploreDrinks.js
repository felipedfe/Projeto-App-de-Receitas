import React from 'react';
import { useHistory } from 'react-router-dom';
import { getSurpriseDrink } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/explore.css';

function ExploreDrinks() {
  const history = useHistory();
  const redirectByIngredient = () => {
    history.push('/explore/drinks/ingredients');
  };

  const redirectBySurpriseDrink = async () => {
    const apiSurpriseDrink = await getSurpriseDrink();
    const drink = apiSurpriseDrink.drinks;
    const result = drink[0].idDrink;
    history.push(`/drinks/${result}`);
  };

  return (
    <section>
      <section className="header-sect">
        <Header />
      </section>
      <section className="explore-content-sect">
        <button
          className="explore-btn"
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ redirectByIngredient }
        >
          By Ingredient
        </button>
        <button
          className="explore-btn"
          data-testid="explore-surprise"
          type="button"
          onClick={ redirectBySurpriseDrink }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default ExploreDrinks;

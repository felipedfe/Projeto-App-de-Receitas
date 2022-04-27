import React from 'react';
import { useHistory } from 'react-router-dom';
import { getSurpriseDrink } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/exploreDrink.css';

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
      <Header />
      <section className="exploreSection">
        <h1>Explore Drinks</h1>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ redirectByIngredient }
        >
          By Ingredient
        </button>
        <button
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

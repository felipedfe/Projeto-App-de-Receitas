import React from 'react';
import { useHistory } from 'react-router-dom';
import { getSurpriseFood } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/explore.css';

function ExploreFoods() {
  const history = useHistory();
  const redirectByIngredient = () => {
    history.push('/explore/foods/ingredients');
  };

  const redirectByNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  const redirectBySurpriseMe = async () => {
    const apiSurpriseFood = await getSurpriseFood();
    const food = apiSurpriseFood.meals;
    const result = food[0].idMeal;
    history.push(`/foods/${result}`);
  };

  return (
    <section>
      <section className="header-sect">
        <Header />
      </section>
      <section className="explore-content-sect">
        <button
          className="explore-btn"
          type="button"
          onClick={ redirectByIngredient }
        >
          By Ingredient
        </button>
        <button
          className="explore-btn"
          type="button"
          onClick={ redirectByNationality }
        >
          By Nationality
        </button>
        <button
          className="explore-btn"
          type="button"
          onClick={ redirectBySurpriseMe }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default ExploreFoods;

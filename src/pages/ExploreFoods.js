import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getSurpriseFood } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';
import '../style/exploreFoods.css';

function ExploreFoods() {
  const history = useHistory();
  const { search } = useContext(MyContext);
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
      <section>
        <Header />
        {search && <SearchBar />}
      </section>
      <section className="exploreSection">
        <h1>Explore Foods</h1>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ redirectByIngredient }
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-by-nationality"
          type="button"
          onClick={ redirectByNationality }
        >
          By Nationality
        </button>
        <button
          data-testid="explore-surprise"
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

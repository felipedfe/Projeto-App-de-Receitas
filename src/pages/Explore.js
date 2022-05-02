import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/explore.css';

function Explore() {
  const history = useHistory();

  const goToExploreFoodsPage = () => {
    history.push('/explore/foods');
  };

  const goToExploreDrinks = () => {
    history.push('/explore/drinks');
  };

  return (
    <section>
      <section>
        <Header />
      </section>
      <section className="sectionExplore">
        <h1>Explore</h1>
        <button
          id="exploreFoods"
          type="button"
          data-testid="explore-foods"
          onClick={ goToExploreFoodsPage }
        >
          Explore Foods
        </button>
        <button
          id="exploreDrinks"
          type="button"
          data-testid="explore-drinks"
          onClick={ goToExploreDrinks }
        >
          Explore Drinks
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default Explore;

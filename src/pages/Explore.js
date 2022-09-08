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
      <section className="header-sect">
        <Header />
      </section>
      <section className="explore-content-sect">
        <button
          className="explore-btn"
          id="exploreFoods"
          type="button"
          onClick={ goToExploreFoodsPage }
        >
          Explore Foods
        </button>
        <button
          className="explore-btn"
          id="exploreDrinks"
          type="button"
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

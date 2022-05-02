import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';

function ExploreDrinksByIngredients() {
  const { search } = useContext(MyContext);
  return (
    <section>
      <section>
        <Header />
        {search && <SearchBar />}
      </section>
      <Footer />
    </section>
  );
}

export default ExploreDrinksByIngredients;

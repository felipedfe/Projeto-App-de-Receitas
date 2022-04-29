import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import SearchBar from '../components/SearchBar';

function Drinks() {
  const { search, getMealsAndDrinks } = useContext(MyContext);

  useEffect(() => {
    getMealsAndDrinks('drink');
    getMealsAndDrinks('meal');
  }, []);

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

export default Drinks;

import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';
import Footer from '../components/Footer';

function Foods() {
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

export default Foods;

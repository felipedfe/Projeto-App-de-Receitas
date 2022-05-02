import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';

function DoneRecipes() {
  const { search } = useContext(MyContext);
  return (
    <section>
      <Header />
      {search && <SearchBar />}
    </section>
  );
}

export default DoneRecipes;

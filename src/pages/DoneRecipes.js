import React, { useContext, useEffect, useState } from 'react';
import CardDoneRecipes from '../components/CardDoneRecipe';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';
import { getDoneRecipes } from '../services/localStorage';

function DoneRecipes() {
  const { search } = useContext(MyContext);
  const [doneRecipe, setDoneRecipe] = useState([]);
  const [filterRecipe, setFilterRecipe] = useState([]);

  useEffect(() => {
    setDoneRecipe(getDoneRecipes());
    setFilterRecipe(getDoneRecipes());
  }, []);

  const handleClick = (type) => {
    if (type !== 'all') {
      const getFilterBtn = doneRecipe.filter((kind) => kind.type === type);
      setFilterRecipe(getFilterBtn);
    } else {
      setFilterRecipe(doneRecipe);
    }
  };

  return (
    <section>
      <section className="header-sect">
        <Header />
        {search && <SearchBar />}
      </section>
      <section className="cat-search-sect">
        <button
          className="cat-btn"
          type="button"
          onClick={ () => handleClick('all') }
        >
          All
        </button>
        <button
          className="cat-btn"
          type="button"
          onClick={ () => handleClick('food') }
        >
          Foods
        </button>
        <button
          className="cat-btn"
          type="button"
          onClick={ () => handleClick('drink') }
        >
          Drinks
        </button>
      </section>
      <section className="done-cards-sect">
        {filterRecipe.map((recipe, index) => (
          <CardDoneRecipes
            key={ recipe.id }
            recipes={ recipe }
            index={ index }
          />
        ))}
      </section>
    </section>
  );
}

export default DoneRecipes;

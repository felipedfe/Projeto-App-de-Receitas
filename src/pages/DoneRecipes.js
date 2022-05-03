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
  console.log(doneRecipe);

  const handleClick = (type) => {
    if (type !== 'all') {
      const getFilterBtn = doneRecipe.filter((kind) => kind.type === type);
      setFilterRecipe(getFilterBtn);
    } else {
      setFilterRecipe(doneRecipe);
    }
  };
  console.log(filterRecipe);

  return (
    <section>
      <Header />
      {search && <SearchBar />}
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClick('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClick('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClick('drink') }
        >
          Drink
        </button>
      </section>
      {
        filterRecipe.map((recipe, index) => (
          <section key={ recipe.id }>
            <CardDoneRecipes
              recipes={ recipe }
              index={ index }
            />
          </section>
        ))
      }
    </section>
  );
}

export default DoneRecipes;

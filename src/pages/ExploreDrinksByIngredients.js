import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';

function ExploreDrinksByIngredients() {
  const { search, drinkIngredients, setIngredientDrinkSelected } = useContext(MyContext);
  const INGREDIENTS_LENGTH = 12;
  const history = useHistory();

  const filteringArray = drinkIngredients.slice(0, INGREDIENTS_LENGTH);

  const handleClick = (name) => {
    setIngredientDrinkSelected(name);
    history.push('/drinks');
  };

  return (
    <section>
      <section>
        <Header />
        {search && <SearchBar />}
        {filteringArray.map((each, index) => (
          <button
            type="button"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => handleClick(each.strIngredient1) }
          >
            <p data-testid={ `${index}-card-name` }>{each.strIngredient1}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={
                `https://www.thecocktaildb.com/images/ingredients/${each.strIngredient1}-Small.png`
              }
              alt={ index }
            />
          </button>
        ))}
      </section>
      <Footer />
    </section>
  );
}

export default ExploreDrinksByIngredients;

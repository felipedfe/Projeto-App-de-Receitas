import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodsByIngredients() {
  const { search, foodIngredients, setIngredientFoodSelected } = useContext(MyContext);
  const INGREDIENTS_LENGTH = 12;
  const history = useHistory();

  const filteringArray = foodIngredients.slice(0, INGREDIENTS_LENGTH);

  const handleClick = (name) => {
    setIngredientFoodSelected(name);
    history.push('/foods');
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
            onClick={ () => handleClick(each.strIngredient) }
          >
            <p data-testid={ `${index}-card-name` }>{each.strIngredient}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${each.strIngredient}-Small.png` }
              alt={ index }
            />
          </button>
        ))}
      </section>
      <Footer />
    </section>
  );
}

export default ExploreFoodsByIngredients;

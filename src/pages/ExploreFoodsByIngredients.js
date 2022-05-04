import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';

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
      <section className="header-sect">
        <Header />
        {search && <SearchBar />}
      </section>
      <section className="recipe-card-container food-content-sect">
        {filteringArray.map((each, index) => (
          <button
            className="recipe-card-btn"
            type="button"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => handleClick(each.strIngredient) }
          >
            <section className="recipe-card">
              <img
                className="recipe-card-img"
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${each.strIngredient}-Small.png` }
                alt={ index }
              />
              <p data-testid={ `${index}-card-name` }>{each.strIngredient}</p>
            </section>
          </button>
        ))}
      </section>
      <Footer />
    </section>
  );
}

export default ExploreFoodsByIngredients;

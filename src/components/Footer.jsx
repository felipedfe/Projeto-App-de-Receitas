import React from 'react';
import '../style/footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const actionButtonDrink = () => {
    history.push('/drinks');
  };

  const actionButtonExplore = () => {
    history.push('/explore');
  };

  const actionButtonFoods = () => {
    history.push('/foods');
  };

  return (
    <footer data-testid="footer" className="main-footer">

      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ actionButtonDrink }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="Drink icon" />
      </button>

      <button
        data-testid="explore-bottom-btn"
        type="button"
        onClick={ actionButtonExplore }
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="Explore icon" />
      </button>

      <button
        data-testid="food-bottom-btn"
        type="button"
        onClick={ actionButtonFoods }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="Meal icon" />
      </button>

    </footer>
  );
}

export default Footer;

import React from 'react';
import { GiMartini, GiKnifeFork } from 'react-icons/gi';
import { ImCompass2 } from 'react-icons/im';
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
    <footer className="main-footer">

      <button
        type="button"
        onClick={ actionButtonDrink }
        src={ drinkIcon }
      >
        <GiMartini className="react-icon" />
      </button>

      <button
        type="button"
        onClick={ actionButtonExplore }
        src={ exploreIcon }
      >
        <ImCompass2 className="react-icon" />
      </button>

      <button
        type="button"
        onClick={ actionButtonFoods }
        src={ mealIcon }
      >
        <GiKnifeFork className="react-icon" />
      </button>

    </footer>
  );
}

export default Footer;

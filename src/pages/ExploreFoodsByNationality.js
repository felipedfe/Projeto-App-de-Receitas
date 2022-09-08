import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loadingFoods, getFoodsByArea } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MyContext from '../context/MyContext';
import RecipeCard from '../components/RecipeCard';

function ExploreFoodsByNationality() {
  const { search, nationality } = useContext(MyContext);
  const [option, setAllOption] = useState('');
  const [allFoods, setAllFoods] = useState([]);
  const NUMBER_CARDS = 12;
  const history = useHistory();

  const renderByNationality = async () => {
    const response = await loadingFoods();
    setAllFoods(response?.meals.slice(0, NUMBER_CARDS));
  };

  const handleClick = (id) => {
    history.push(`/foods/${id}`);
  };

  const selectedOption = async () => {
    if (option === 'all') {
      return renderByNationality();
    }
    if (option) {
      const response = await getFoodsByArea(option);
      setAllFoods(response?.meals.slice(0, NUMBER_CARDS));
    }
  };

  useEffect(() => {
    selectedOption();
  }, [option]);

  const onChange = (event) => {
    const { target } = event;
    setAllOption(target.value);
  };

  useEffect(() => {
    renderByNationality();
  }, []);

  return (
    <section>
      <section>
        <section className="header-sect">
          <Header />
          {search && <SearchBar />}
        </section>
        <section className="select-sect">
          <select
            className="select"
            onChange={ (event) => onChange(event) }
          >
            <option
              name="all"
              value="all"
            >
              All
            </option>
            {nationality.map((each, index) => (
              <option
                name={ each.strArea }
                value={ each.strArea }
                key={ index }
              >
                {each.strArea}

              </option>
            ))}
          </select>
        </section>
      </section>
      <section className="recipe-card-container">
        {allFoods.map((each, index) => (
          <button
            className="recipe-card-btn"
            type="button"
            onClick={ () => handleClick(each.idMeal) }
            key={ index }
          >
            <RecipeCard recipe={ each } index={ index } recipeType="meal" />
          </button>
        ))}
      </section>
      <Footer />
    </section>
  );
}

export default ExploreFoodsByNationality;

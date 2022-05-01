import React, { useState } from 'react';
import Header from '../components/Header';
import { addFavorite, getFavorites } from '../services/localStorage';
import FavoriteCard from '../components/FavoriteCard';

const testRecipe = {
  id: '52882',
  type: 'food',
  nationality: 'British',
  category: 'Seafood',
  alcoholicOrNot: '',
  name: 'Three Fish Pie',
  image: 'https://www.themealdb.com/images/media/meals/spswqs1511558697.jpg',
};

// const testRecipe2 = {
//   id: '77333',
//   type: 'drink',
//   nationality: 'Brazilian',
//   category: 'Bebida',
//   alcoholicOrNot: 'Alcoholic',
//   name: 'Caipirinha',
//   image: 'https://www.themealdb.com/images/media/meals/spswqs1511558697.jpg',
// };

console.log(localStorage.favoriteRecipes);

const handleClick = () => {
  addFavorite(testRecipe);
};

function FavoriteRecipes() {
  // Aqui resgatamos as receitas favoritas salvas no Local Storage
  const favoriteRecipes = getFavorites();
  console.log('-->', favoriteRecipes);

  // State
  const [favoriteRecipesState, setFavoriteRecipesState] = useState(favoriteRecipes);
  const [filter, setFilter] = useState('');
  // Acima colocamos a lista de receitas no estado inicial do componente

  // Função para filtrar receitas (filtradas pelo contrário do seu type)
  const filterRecipes = (type = '') => {
    console.log(type);
    setFilter(type);
    // const filteredByType = favoriteRecipesState.filter((item) => item.type !== type);
    // console.log(filteredByType);
    // setFavoriteRecipesState(filteredByType);

    // return filteredByType.map((recipe) => (
    //   <FavoriteCard
    //     key={ recipe.id }
    //     recipe={ recipe }
    //     setFavoriteRecipesState={ setFavoriteRecipesState }
    //   />));
  };

  const renderRecipes = () => {
    const filteredByType = favoriteRecipesState.filter((item) => item.type !== filter);
    return filteredByType.map((recipe, index) => (
      <FavoriteCard
        key={ recipe.id }
        index={ index }
        recipe={ recipe }
        setFavoriteRecipesState={ setFavoriteRecipesState }
      />));
  };

  return (
    <section>
      <button
        type="button"
        onClick={ handleClick }
      >
        ADD RECIPE
      </button>
      <Header />
      <div className="filters-container">
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => filterRecipes('drink') }
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => filterRecipes('food') }
        >
          Drinks
        </button>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => filterRecipes() }
        >
          All
        </button>
      </div>
      {/* {favoriteRecipesState.map((recipe) => (
        <FavoriteCard
          key={ recipe.id }
          recipe={ recipe }
          setFavoriteRecipesState={ setFavoriteRecipesState }
        />))} */}
      {renderRecipes()}
    </section>
  );
}

export default FavoriteRecipes;

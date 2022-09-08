import React, { useState } from 'react';
import Header from '../components/Header';
import { getFavorites } from '../services/localStorage';
import FavoriteCard from '../components/FavoriteCard';

function FavoriteRecipes() {
  // Aqui resgatamos as receitas favoritas salvas no Local Storage
  const favoriteRecipes = getFavorites();

  // State
  const [favoriteRecipesState, setFavoriteRecipesState] = useState(favoriteRecipes);
  const [filter, setFilter] = useState('');
  // Acima colocamos a lista de receitas no estado inicial do componente

  // Função para filtrar receitas (filtradas pelo contrário do seu type)
  const filterRecipes = (type = '') => {
    setFilter(type);
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
      <section className="header-sect">
        <Header />
      </section>
      <div className="cat-search-sect">
        <button
          className="cat-btn"
          type="button"
          onClick={ () => filterRecipes() }
        >
          All
        </button>
        <button
          className="cat-btn"
          type="button"
          onClick={ () => filterRecipes('drink') }
        >
          Foods
        </button>
        <button
          className="cat-btn"
          type="button"
          onClick={ () => filterRecipes('food') }
        >
          Drinks
        </button>
      </div>
      <section className="done-cards-sect">
        {renderRecipes()}
      </section>
    </section>
  );
}

export default FavoriteRecipes;

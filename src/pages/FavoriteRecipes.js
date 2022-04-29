import React from 'react';
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
//   alcoholicOrNot: 'yes',
//   name: 'Caipirinha',
//   image: 'https://www.themealdb.com/images/media/meals/spswqs1511558697.jpg',
// };

console.log(localStorage.favoriteRecipes);

const handleClick = () => {
  console.log('oi');
  addFavorite(testRecipe);
};

const favoriteRecipes = getFavorites();
console.log(favoriteRecipes);

function FavoriteRecipes() {
  return (
    <section>
      <button
        type="button"
        onClick={ handleClick }
      >
        ADD RECIPE
      </button>
      <Header />
      {favoriteRecipes.map((recipe) => (
        <FavoriteCard
          key={ recipe.id }
          recipe={ recipe }
        />))}
    </section>
  );
}

export default FavoriteRecipes;

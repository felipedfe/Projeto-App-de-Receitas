import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Provider from './components/Provider';
// import SearchBar from './components/SearchBar';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import ExploreFoodsByNationality from './pages/ExploreFoodsByNationality';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinksByIngredientes from './pages/ExploreDrinksByIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ProgressFood from './pages/ProgressFood';
import ProgressDrink from './pages/ProgressDrink';
import DetailsDrink from './pages/DetailsDrink';
import DetailsFood from './pages/DetailsFood';

function App() {
  return (
    <Provider>
      <div className="">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods/:id/in-progress" component={ ProgressFood } />
          <Route path="/foods/:id" component={ DetailsFood } />
          <Route exact path="/foods" component={ Foods } />
          <Route path="/drinks/:id/in-progress" component={ ProgressDrink } />
          <Route path="/drinks/:id" component={ DetailsDrink } />
          <Route path="/drinks" component={ Drinks } />
          <Route
            path="/explore/foods/ingredients"
            component={ ExploreFoodsByIngredients }
          />
          <Route
            path="/explore/foods/nationalities"
            component={ ExploreFoodsByNationality }
          />
          <Route path="/explore/foods" component={ ExploreFoods } />
          <Route
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksByIngredientes }
          />
          <Route path="/explore/drinks" component={ ExploreDrinks } />
          <Route path="/explore" component={ Explore } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;

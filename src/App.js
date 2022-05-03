import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Provider from './components/Provider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import ExploreFoodsByNationality from './pages/ExploreFoodsByNationality';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ProgressFood from './pages/ProgressFood';
import ProgressDrink from './pages/ProgressDrink';
import DetailsDrink from './pages/DetailsDrink';
import DetailsFood from './pages/DetailsFood';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider>
      <div className="main-sect">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/explore/drinks/nationalities" component={ NotFound } />
          <Route path="/foods/:id/in-progress" component={ ProgressFood } />
          <Route path="/foods/:id" component={ DetailsFood } />
          <Route exact path="/foods" component={ Foods } />
          <Route path="/drinks/:id/in-progress" component={ ProgressDrink } />
          <Route path="/drinks/:id" component={ DetailsDrink } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodsByIngredients }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreFoodsByNationality }
          />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksByIngredients }
          />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;

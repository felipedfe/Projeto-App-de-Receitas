import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import Provider from './components/Provider';

function App() {
  return (
    <Provider>
      <div className="">
        <Switch>
          <Route exact path="/" component={ SearchBar } />
          <Route path="/foods" component={ SearchBar } />
          <Route path="/drinks" component={ SearchBar } />
          <Route path="/foods/:id/in-progress" component={ SearchBar } />
          <Route path="/foods/:id" component={ SearchBar } />
          <Route path="/drinks/:id/in-progress" component={ SearchBar } />
          <Route path="/drinks/:id" component={ SearchBar } />
          <Route path="/explore" component={ SearchBar } />
          <Route path="/explore/foods/ingredients" component={ SearchBar } />
          <Route path="/explore/foods/nationalities" component={ SearchBar } />
          <Route path="/explore/foods/" component={ SearchBar } />
          <Route path="/explore/drinks/ingredients" component={ SearchBar } />
          <Route path="/explore/drinks" component={ SearchBar } />
          <Route path="/profile" component={ SearchBar } />
          <Route path="/done-recipes" component={ SearchBar } />
          <Route path="/favorite-recipes" component={ SearchBar } />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;

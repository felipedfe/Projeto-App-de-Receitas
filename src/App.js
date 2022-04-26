import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Login } />
        <Route path="/drinks" component={ Login } />
        <Route path="/foods/:id/in-progress" component={ Login } />
        <Route path="/foods/:id" component={ Login } />
        <Route path="/drinks/:id/in-progress" component={ Login } />
        <Route path="/drinks/:id" component={ Login } />
        <Route path="/explore" component={ Login } />
        <Route path="/explore/foods/ingredients" component={ Login } />
        <Route path="/explore/foods/nationalities" component={ Login } />
        <Route path="/explore/foods/" component={ Login } />
        <Route path="/explore/drinks/ingredients" component={ Login } />
        <Route path="/explore/drinks" component={ Login } />
        <Route path="/profile" component={ Login } />
        <Route path="/done-recipes" component={ Login } />
        <Route path="/favorite-recipes" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;

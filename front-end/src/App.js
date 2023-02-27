import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Logo from './images/Logo.svg';
import './App.css';

import Login from './Pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path={ ['/', '/login'] }>
        <div className="App">
          <img src={ Logo } alt="Your SVG" />
          <Login />
        </div>
      </Route>
    </Switch>
  );
}

export default App;

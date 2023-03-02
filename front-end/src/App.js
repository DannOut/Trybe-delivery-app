import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Logo from './images/Logo.svg';
import './App.css';

import Login from './Pages/Login';
import RedirectToLogin from './Pages/RedirectToLogin';
import Products from './Pages/Customer.products';

function App() {
  return (
    <Switch>
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/login">
        <div className="App">
          <img src={ Logo } alt="Your SVG" />
          <Login />
        </div>
      </Route>
      <Route exact path="/">
        <div className="App">
          <img src={ Logo } alt="Your SVG" />
          <RedirectToLogin />
        </div>
      </Route>
    </Switch>
  );
}

export default App;

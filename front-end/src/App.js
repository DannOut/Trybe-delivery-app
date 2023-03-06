import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Logo from './images/Logo.svg';
import './App.css';
import {
  Login,
  Products,
  RedirectToLogin,
  Register,
  SellerOrders,
  SellerOrdersDetails,
} from './Pages';

function App() {
  return (
    <Switch>
      <Route exact path="/seller/orders/:id" component={ SellerOrdersDetails } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/customer/products" component={ Products } />
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
      <Route exact path="/register" component={ Register } />
    </Switch>
  );
}

export default App;

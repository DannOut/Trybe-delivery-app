import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Navbar() {
  const { name } = JSON.parse(localStorage.getItem('user')) || '';
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <nav>
      <div data-testid="customer_products__element-navbar-link-products">
        Products
      </div>
      <div data-testid="customer_products__element-navbar-link-orders">
        Orders
      </div>
      <div data-testid="customer_products__element-navbar-user-full-name">
        {name}
      </div>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ logout }
      >
        link-logout
      </button>
    </nav>
  );
}

import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Navbar() {
  const { name, role } = JSON.parse(localStorage.getItem('user')) || '';
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const navBarDynamicInfoLeft = () => {
    if (role === 'administrator') return 'Gerênciar Usuários';
    if (role === 'seller') return 'Menu de vendas';
    if (role === 'customer') return 'Produtos';
  };

  return (
    <nav>
      <div data-testid="customer_products__element-navbar-link-products">
        { navBarDynamicInfoLeft() }
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

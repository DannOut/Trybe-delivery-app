import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import styles from '../css/Navbar.module.css';
import Logo from '../images/Logo.svg';

export default function Navbar() {
  const { name, role } = JSON.parse(localStorage.getItem('user')) || '';
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <header className={ styles.menu }>
      <div>
        <NavLink to="/customer/products" className={ styles.products }>
          <div
            data-testid="customer_products__element-navbar-link-products"
          >
            Products
          </div>
        </NavLink>
        <NavLink to={ `/${role}/orders` } className={ styles.orders }>
          <div
            data-testid="customer_products__element-navbar-link-orders"
          >
            Orders
          </div>
        </NavLink>
        <img src={ Logo } alt="" />
      </div>
      <nav>
        <div data-testid="customer_products__element-navbar-user-full-name">
          {name}
        </div>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logout }
        >
          Sair
        </button>
      </nav>
    </header>
  );
}

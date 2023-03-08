import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
// import styles from './Navbar.module.css';
// import Logo from '../images/Logo.svg';

export default function Navbar() {
  const { name, role } = JSON.parse(localStorage.getItem('user')) || '';
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
  // <<<<<<< HEAD
    <nav>
      <NavLink to="/customer/products">
        <div data-testid="customer_products__element-navbar-link-products">
          Products
        </div>
      </NavLink>
      <NavLink to={ `/${role}/orders` }>
        <div data-testid="customer_products__element-navbar-link-orders">
          Orders
        </div>
      </NavLink>
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
  // =======
  //     <header className={ styles.menu }>
  //       <div>
  //         <a
  //           href="#sadas"
  //           className={ styles.products }
  //           data-testid="customer_products__element-navbar-link-products"
  //         >
  //           Produtos
  //         </a>
  //         <a
  //           href="#asd"
  //           className={ styles.orders }
  //           data-testid="customer_products__element-navbar-link-orders"
  //         >
  //           Meu Pedidos
  //         </a>
  //       </div>
  //       <img src={ Logo } alt="" />
  //       <nav>
  //         <div data-testid="customer_products__element-navbar-user-full-name">
  //           {name}
  //         </div>
  //         <button
  //           type="button"
  //           data-testid="customer_products__element-navbar-link-logout"
  //           onClick={ logout }
  //         >
  //           Sair
  //         </button>
  //       </nav>
  //     </header>
  // >>>>>>> main-group-21-dev
  );
}

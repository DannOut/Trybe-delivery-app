import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import renderWithRouter from '../utils/RenderWithRouter';

describe('Navbar', () => {
  it('01- Renderiza a barra de navegação com informações do usuário', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Zé Birita', role: 'customer' }));
    renderWithRouter(<Navbar />);

    expect(screen.getByTestId('customer_products__element-navbar-user-full-name'))
      .toHaveTextContent('Zé Birita');
  });

  it('02- Navega para a página de produtos quando o link de produtos é clicado', () => {
    const { history } = renderWithRouter(<Navbar />);
    const linkElement = screen
      .getByTestId('customer_products__element-navbar-link-products');
    fireEvent.click(linkElement);
    expect(history.location.pathname).toBe('/customer/products');
  });

  it('03- Navega para a página de pedidos quando o link de pedidos é clicado', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Zé Birita', role: 'customer' }));
    const { history } = renderWithRouter(<Navbar />);
    const linkElement = screen
      .getByTestId('customer_products__element-navbar-link-orders');
    fireEvent.click(linkElement);
    expect(history.location.pathname).toBe('/customer/orders');
  });

  it('04- Quando o botão de logout for clicado desloga do usuário', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Zé Birita', role: 'customer' }));
    const { history } = renderWithRouter(<Navbar />);
    const buttonElement = screen
      .getByTestId('customer_products__element-navbar-link-logout');
    fireEvent.click(buttonElement);
    expect(history.location.pathname).toBe('/login');
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('Exibi o nome completo do usuário', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Zé Birita' }));
    renderWithRouter(<Navbar />);

    expect(screen.getByTestId('customer_products__element-navbar-user-full-name'))
      .toHaveTextContent('Zé Birita');
  });
});

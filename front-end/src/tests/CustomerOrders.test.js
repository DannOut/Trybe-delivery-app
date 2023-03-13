import React from 'react';
import { screen } from '@testing-library/react';
import CustomerOrders from '../Pages/CustomerOrders';
import renderWithRouter from '../utils/RenderWithRouter';

describe('Testando CustomerOrders', () => {
  it('Renderiza a navbar', () => {
    renderWithRouter(<CustomerOrders />);
    const navbarElement = screen
      .getByTestId('customer_products__element-navbar-link-products');
    expect(navbarElement).toBeInTheDocument();
  });
});

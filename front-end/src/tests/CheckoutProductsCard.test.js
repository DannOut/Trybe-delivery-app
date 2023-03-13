import React from 'react';
import { screen } from '@testing-library/react';
import CheckoutProductsCard from '../components/CheckoutProductsCard';
import renderWithRouter from '../utils/RenderWithRouter';

describe('Testando o componente CheckoutProductsCard', () => {
  it('01- Renderiza o componente', () => {
    renderWithRouter(<CheckoutProductsCard />);
    expect(screen.getByText('Finalizar Pedido')).toBeInTheDocument();
  });

  it('02- Renderiza a tabela com os cabeçalhos corretos', () => {
    renderWithRouter(<CheckoutProductsCard />);
    const headers = ['Item',
      'Descrição', 'Quantidade', 'Valor unitário', 'Sub-total', 'Remover Item'];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('03- Apresenta as informações do produto', () => {
    renderWithRouter(<CheckoutProductsCard />);
    expect(screen
      .getByTestId('customer_checkout__element-order-table-item-number-<index>'))
      .toHaveTextContent('1');
    expect(screen
      .getByTestId('customer_checkout__element-order-table-name-<index>'))
      .toHaveTextContent('Cerveja Skol');
    expect(screen
      .getByTestId('customer_checkout__element-order-table-quantity-<index>'))
      .toHaveTextContent('3');
    expect(screen
      .getByTestId('customer_checkout__element-order-table-unit-price-<index>'))
      .toHaveTextContent('R$4,10');
    expect(screen
      .getByTestId('customer_checkout__element-order-table-sub-total-<index>'))
      .toHaveTextContent('R$16,30');
    expect(screen
      .getByTestId('customer_checkout__element-order-table-remove-<index>'))
      .toHaveTextContent('Test');
  });

  it('04- Renderiza o botão remover', () => {
    renderWithRouter(<CheckoutProductsCard />);
    expect(screen.getByRole('button', { name: 'Remover' })).toBeInTheDocument();
  });

  it('Os textos estão presentes na tela', () => {
    renderWithRouter(<CheckoutProductsCard />);

    expect(screen.getByRole('button', { name: 'Remover' }))
      .toHaveTextContent(/Remover/i);
  });
});

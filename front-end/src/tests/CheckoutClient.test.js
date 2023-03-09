import React from 'react';
import CheckoutClient from '../Pages/CheckoutClient';
import renderWithRouter from '../utils/RenderWithRouter';

describe('Testando CheckoutClient', () => {
  it('Renderiza o componente', () => {
    const { getByText } = renderWithRouter(<CheckoutClient />);
    expect(getByText('Finalizar Pedido')).toBeInTheDocument();
  });
});

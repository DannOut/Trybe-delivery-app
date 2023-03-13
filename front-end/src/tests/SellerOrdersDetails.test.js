import React from 'react';
import { screen } from '@testing-library/react';
import SellerOrdersDetails from '../Pages/SellerOrdersDetails';
import RenderWithRouter from '../utils/RenderWithRouter';
import { mockOrder, mockMatch } from './mocks/SellerOrdersDetails.mock';

const status = 'seller_order_details__element-order-details-label-delivery-status';

describe('Testando SellerOrdersDetails', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockOrder),
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('Renderiza os detalhes do pedido', async () => {
    RenderWithRouter(<SellerOrdersDetails match={ mockMatch } />);

    expect(await screen
      .findByTestId('seller_order_details__element-order-details-label-order-id'))
      .toBeInTheDocument();
    expect(screen.getByText('Detalhe do Pedido')).toBeInTheDocument();
    expect(screen.getByText('PEDIDO 1')).toBeInTheDocument();
    expect(screen
      .getByTestId('seller_order_details__element-order-details-label-order-date'))
      .toBeInTheDocument();
    expect(screen
      .getByTestId(status))
      .toBeInTheDocument();
    expect(screen.getByTestId('seller_order_details__button-preparing-check'))
      .toBeInTheDocument();
    expect(screen.getByTestId('seller_order_details__button-dispatch-check'))
      .toBeInTheDocument();
    expect(screen.getByTestId('seller_order_details__element-order-total-price'))
      .toBeInTheDocument();
  });

  it('Os textos estão presentes na tela', () => {
    RenderWithRouter(<SellerOrdersDetails match={ mockMatch } />);

    expect(screen.getByRole('heading', { name: 'Detalhe do Pedido' }))
      .toHaveTextContent(/Detalhe do Pedido/i);
    expect(screen.getAllByRole('button', { name: 'Preparar Pedido' })[0])
      .toHaveTextContent(/Preparar Pedido/i);
    expect(screen.getAllByRole('button', { name: 'Saiu para Entrega' })[0])
      .toHaveTextContent(/Saiu para Entrega/i);
  });
});

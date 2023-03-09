import React from 'react';
import { waitFor } from '@testing-library/react';
import SellerOrders from '../Pages/SellerOrders';
import api from '../Service/api';
import renderWithRouter from '../utils/RenderWithRouter';

jest.mock('../Service/api');

describe('Testando SellerOrders', () => {
  it('Exibe os pedidos', async () => {
    const orders = [
      {
        id: 1,
        totalPrice: 50.0,
        status: 'pending',
        saleDate: '2022-03-07T10:00:00Z',
        deliveryAdress: 'Rua A, 123',
      },
      {
        id: 2,
        totalPrice: 100.0,
        status: 'delivered',
        saleDate: '2022-03-06T09:00:00Z',
        deliveryAdress: 'Rua B, 456',
      },
    ];
    api.get.mockResolvedValueOnce({ data: { sales: orders } });

    const { getByTestId } = renderWithRouter(<SellerOrders />);

    await waitFor(() => {
      orders.forEach((order) => {
        expect(getByTestId(`seller_orders__element-order-id-${order.id}`))
          .toBeInTheDocument();
        expect(getByTestId(`seller_orders__element-delivery-status-${order.id}`))
          .toBeInTheDocument();
        expect(getByTestId(`seller_orders__element-order-date-${order.id}`))
          .toBeInTheDocument();
        expect(getByTestId(`seller_orders__element-card-address-${order.id}`))
          .toBeInTheDocument();
        expect(getByTestId(`seller_orders__element-card-price-${order.id}`))
          .toBeInTheDocument();
      });
    });
  });
});

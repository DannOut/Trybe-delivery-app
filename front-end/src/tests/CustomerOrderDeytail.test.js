import React from 'react';
import { screen } from '@testing-library/react';
import axios from 'axios';
import renderWithRouter from '../utils/RenderWithRouter';
import CustomerOrderDetail from '../Pages/CustomerOrderDetail';

jest.mock('axios');

describe('CustomerOrderDetail', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('should render customer order details', async () => {
    const sales = [
      {
        id: 1,
        totalPrice: 100.0,
        status: 'pending',
        saleDate: '2022-03-07T16:12:45.359Z',
      },
      {
        id: 2,
        totalPrice: 50.0,
        status: 'delivered',
        saleDate: '2022-03-05T16:12:45.359Z',
      },
    ];

    const products = [
      {
        id: 1,
        name: 'Product 1',
        price: 10.0,
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20.0,
      },
    ];

    axios.get.mockImplementation((url) => {
      switch (url) {
      case '/sales':
        return Promise.resolve({ data: { sales } });
      case '/products':
        return Promise.resolve({ data: products });
      default:
        return Promise.reject(new Error(`Invalid URL: ${url}`));
      }
    });

    renderWithRouter(<CustomerOrderDetail />);

    // Wait for API requests to resolve
    await screen.findByText(/detalhes do pedido/i);
    await screen.findAllByRole('listitem');

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(screen.getByText(/detalhes do pedido/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(sales.length);
  });
});

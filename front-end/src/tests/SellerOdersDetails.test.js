import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SellerOrdersDetails from '../Pages/SellerOrdersDetails';
import api from '../Service/api';

jest.mock('../Service/api');

describe('SellerOrdersDetails', () => {
  const orderMock = {
    id: 1,
    saleDate: '2022-02-22T13:28:55.189Z',
    products: [
      {
        quantity: 2,
        product: {
          id: 1,
          name: 'Product 1',
          price: 5.99,
        },
      },
      {
        quantity: 1,
        product: {
          id: 2,
          name: 'Product 2',
          price: 7.99,
        },
      },
    ],
    status: 'Pendente',
  };

  beforeEach(() => {
    api.get.mockResolvedValue({ data: orderMock });
    api.patch.mockResolvedValue({});
  });

  it('renders the order details', async () => {
    const { getByText } = render(<SellerOrdersDetails match={ { params: { id: 1 } } } />);

    expect(getByText(/Detalhe do Pedido/i)).toBeInTheDocument();
    expect(getByText(/PEDIDO 1/i)).toBeInTheDocument();
    expect(getByText(/22\/02\/2022/i)).toBeInTheDocument();
    expect(getByText(/Pendente/i)).toBeInTheDocument();

    expect(getByText(/Product 1/i)).toBeInTheDocument();
    expect(getByText(/Product 2/i)).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('5.99')).toBeInTheDocument();
    expect(getByText('7.99')).toBeInTheDocument();
    expect(getByText('11.98')).toBeInTheDocument();
    expect(getByText('7.99')).toBeInTheDocument();
    expect(getByText('19.97')).toBeInTheDocument();
  });

  it('changes the order status', async () => {
    const { getByText, getByTestId } = render(
      <SellerOrdersDetails match={ { params: { id: 1 } } } />,
    );

    const preparingButton = getByTestId('seller_order_details__button-preparing-check');
    fireEvent.click(preparingButton);

    await waitFor(() => expect(api.patch).toHaveBeenCalledTimes(1));
    expect(api.patch)
      .toHaveBeenCalledWith('/sales/1', { status: 'Preparando' }, expect.anything());

    expect(getByText(/Preparando/i)).toBeInTheDocument();
    expect(preparingButton).toBeDisabled();

    const dispatchButton = getByTestId('seller_order_details__button-dispatch-check');
    fireEvent.click(dispatchButton);

    await waitFor(() => expect(api.patch).toHaveBeenCalledTimes(2));
    expect(api.patch)
      .toHaveBeenCalledWith('/sales/1', { status: 'Enviado' }, expect.anything());

    expect(getByText(/Enviado/i)).toBeInTheDocument();
    expect(dispatchButton).toBeDisabled();
  });
});

/* eslint-disable max-len */
import React from 'react';
import CustomerOrderDetail from '../Pages/CustomerOrderDetail';
import RenderWithRouter from '../utils/RenderWithRouter';

const CUSTOMER_SELLER_NAME = 'customer_order_details__element-order-details-label-seller-name';
const CUSTOMER_ORDER_DATE = 'customer_order_details__element-order-details-label-order-date';
const CUSTOMER_CHECK = 'customer_order_details__button-delivery-check';

describe('CustomerOrderDetail', () => {
  test('renders CustomerOrderDetail component', () => {
    const { getByTestId } = RenderWithRouter(<CustomerOrderDetail />);
    const customer = getByTestId(CUSTOMER_SELLER_NAME);
    const name = getByTestId(CUSTOMER_ORDER_DATE);
    const check = getByTestId(CUSTOMER_CHECK);
    expect(customer).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(check).toBeInTheDocument();
  });
});

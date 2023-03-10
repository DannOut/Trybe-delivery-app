/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
import React from 'react';
import axios from 'axios';
// import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../utils/RenderWithRouter';
import App from '../App';
import { mockLoginResponse, mockProductsResponse } from './mocks/Products.mock';
import { checkoutMockRequestSeller } from './mocks/checkout.mock';

const COMMON_LOGIN_INPUT_EMAIL = 'common_login__input-email';
const COMMON_LOGIN_INPUT_PASSWORD = 'common_login__input-password';
const COMMON_LOGIN_BUTTON_LOGIN = 'common_login__button-login';

describe('Teste do componente ProductsCard', () => {
  beforeEach(async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce(mockLoginResponse);
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockProductsResponse);
    jest.spyOn(axios, 'get').mockResolvedValueOnce(checkoutMockRequestSeller);

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    userEvent.type(emailInput, 'email@email.com');
    const passwordInput = screen.getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    userEvent.type(passwordInput, 'abcdef');
    const loginBtn = screen.getByTestId(COMMON_LOGIN_BUTTON_LOGIN);
    userEvent.click(loginBtn);

    await waitFor(() => expect(loginBtn).toBeEnabled());
    userEvent.click(loginBtn);
  });

  test('All Products are listed', async () => {
    const itemDescriptionNumber3 = screen
      .getByTestId('customer_products__element-card-title-3');
    expect(itemDescriptionNumber3.textContent).toBe('Antarctica Pilsen 300ml');

    const incrementeValueItem3 = screen.getByTestId(
      'customer_products__button-card-add-item-3',
    );
    const incrementeValueItem2 = screen.getByTestId(
      'customer_products__button-card-add-item-2',
    );
    userEvent.click(incrementeValueItem3);
    userEvent.click(incrementeValueItem3);
    userEvent.click(incrementeValueItem2);

    const totalValue = screen.getByTestId('customer_products__button-cart');
    await waitFor(async () => expect(totalValue.textContent)
      .toBe('Valor total: 12,48'));

    const decrementValue = screen.getByTestId(
      'customer_products__button-card-rm-item-3',
    );

    userEvent.click(decrementValue);
    await waitFor(async () => expect(totalValue.textContent).toBe('Valor total: 9,99'));

    userEvent.click(totalValue);

    const removeBtn = screen.getByTestId(
      'customer_checkout__element-order-table-remove-0',
    );
    expect(removeBtn).toBeEnabled();
    const checkoutTotalPrice = screen
      .getByTestId('customer_checkout__element-order-total-price');
    await waitFor(async () => expect(checkoutTotalPrice.textContent)
      .toBe('Total: R$ 9,99'));

    userEvent.click(removeBtn);

    await waitFor(async () => expect(checkoutTotalPrice.textContent)
      .toBe('Total: R$ 2,49'));
  });
});

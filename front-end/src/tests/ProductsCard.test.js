/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
import React from 'react';
import axios from 'axios';
import { screen, fireEvent } from '@testing-library/react';
import Context from '../context/Context';
import ProductsCard from '../components/ProductsCard';
import renderWithRouter from '../utils/RenderWithRouter';
import { mockToken, token } from './mocks/User.mock';
import App from '../App';
import testRenderWithRouter from '../utils/testRenderWithRouter';
import productsMock from './mocks/Products.mock';

const TREE = 3;
jest.mock('axios');

describe('Teste do componente ProductsCard', () => {
  const contextValue = {
    order: [],
    setOrder: jest.fn(),
    totalPrice: 0,
    setTotalPrice: jest.fn(),
  };

  const product = {
    id: 1,
    name: 'Skol Lata 250ml',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    price: '2.2',
  };

  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };

    global.localStorage.clear();
    global.localStorage = localStorageMock;
  });

  it.skip('01- Verifica se o componente é renderizado corretamente', () => {
    renderWithRouter(
      <Context.Provider value={ contextValue }>
        <ProductsCard { ...product } />
      </Context.Provider>,
    );

    const productTitle = screen
      .getByTestId(`customer_products__element-card-title-${product.id}`);
    expect(productTitle).toBeInTheDocument();

    const productImage = screen
      .getByTestId(`customer_products__img-card-bg-image-${product.id}`);
    expect(productImage).toBeInTheDocument();

    const productPrice = screen
      .getByTestId(`customer_products__element-card-price-${product.id}`);
    expect(productPrice).toBeInTheDocument();

    const productQuantity = screen
      .getByTestId(`customer_products__input-card-quantity-${product.id}`);
    expect(productQuantity).toBeInTheDocument();

    const productButtonAdd = screen
      .getByTestId(`customer_products__button-card-add-item-${product.id}`);
    expect(productButtonAdd).toBeInTheDocument();

    const productButtonRemove = screen
      .getByTestId(`customer_products__button-card-rm-item-${product.id}`);
    expect(productButtonRemove).toBeInTheDocument();
  });

  it.skip('02- Verifica se o componente atualiza a quantidade de itens', () => {
    const contextValue = {
      order: [{ id: 1,
        name: 'Skol Lata 250ml',
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
        price: '2.2' }],
      setOrder: jest.fn(),
    };

    renderWithRouter(
      <Context.Provider value={ contextValue }>
        <ProductsCard { ...product } />
      </Context.Provider>,
    );

    const productQuantity = screen
      .getByTestId(`customer_products__input-card-quantity-${product.id}`);
    expect(productQuantity).toHaveValue(1);

    fireEvent.change(productQuantity, { target: { value: '3' } });
    expect(productQuantity).toHaveValue(TREE);

    expect(contextValue.setOrder).toHaveBeenCalledTimes(1);
  });

  it.only('03- Check if price is add to cart', async () => {
    global.localStorage.setItem('user', JSON.stringify(mockToken));
    axios.get.mockResolvedValue(productsMock, {
      headers: {
        Authorization: token,
      } });

    const { history } = testRenderWithRouter(
      <Context.Provider value={ contextValue }>
        <App />
      </Context.Provider>,
      '/customer/products',
    );
    const {
      location: { pathname },
    } = history;
    const result = await axios.get('/products');
    console.log('result :>> ', result);

    expect(result.data).toEqual(productsMock);
    expect(pathname).toEqual('/customer/products');
  });
});

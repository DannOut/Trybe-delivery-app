/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Context from '../context/Context';
import ProductsCard from '../components/ProductsCard';
import renderWithRouter from '../utils/RenderWithRouter';

const TREE = 3;

describe('Teste do componente ProductsCard', () => {
  const contextValue = {
    order: [],
    setOrder: jest.fn(),
  };

  const product = {
    id: 1,
    name: 'Skol Lata 250ml',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    price: '2.2',
  };

  it('01- Verifica se o componente é renderizado corretamente', () => {
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

  it('02- Verifica se o componente atualiza a quantidade de itens corretamente', () => {
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
});

const mockOrder = {
  saleDate: '2022-02-22T22:22:22.000Z',
  status: 'Pendente',
  products: [
    {
      quantity: 2,
      product: {
        id: 1,
        name: 'Product 1',
        price: 10,
      },
    },
    {
      quantity: 1,
      product: {
        id: 2,
        name: 'Product 2',
        price: 20,
      },
    },
  ],
};

const mockMatch = {
  params: {
    id: 1,
  },
};

export {
  mockOrder,
  mockMatch,
};

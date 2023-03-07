// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// // import userEvent from '@testing-library/user-event';
// import axios from 'axios';
// import { BrowserRouter } from 'react-router-dom';
// import CheckoutClient from '../Pages/CheckoutClient';
// import Context from '../context/Context';

// jest.mock('axios');

// const tree = 3;
// describe('CheckoutClient', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should render the component', async () => {
//     axios.get.mockResolvedValue({ data: [{ name: 'seller 1' }, { name: 'seller 2' }] });

//     render(
//       <BrowserRouter>
//         <Context.Provider value={ Context }>
//           <CheckoutClient />
//         </Context.Provider>
//       </BrowserRouter>,
//     );

//     const sellerSelect = screen.getByTestId('customer_checkout__select-seller');
//     const sellerOptions = screen.getAllByRole('option');

//     expect(sellerSelect).toBeInTheDocument();
//     expect(sellerOptions).toHaveLength(tree); // One default option plus two options from the mock API call
//     expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/sales/sellers', { headers: { Authorization: undefined } });

//     const productNameElements = await screen.findAllByTestId(/customer_checkout__element-order-table-name-/);
//     expect(productNameElements).toHaveLength(2);
//     expect(productNameElements[0]).toHaveTextContent('Product 1');
//     expect(productNameElements[1]).toHaveTextContent('Product 2');

//     const totalValueElement = screen
//       .getByTestId('customer_checkout__element-order-total-price');
//     expect(totalValueElement).toHaveTextContent('Total: R$ 30,00');
//   });

//   it('should remove an item from the order', async () => {
//     axios.get.mockResolvedValue({ data: [{ name: 'seller 1' }, { name: 'seller 2' }] });

//     render(
//       <BrowserRouter>
//         <Context.Provider value={ Context }>
//           <CheckoutClient />
//         </Context.Provider>
//       </BrowserRouter>,
//     );

//     const removeButton = screen.getAllByTestId(/customer_checkout__element-order-table-remove-/)[0];
//     fireEvent.click(removeButton);

//     const productNameElements = await screen.findAllByTestId(/customer_checkout__element-order-table-name-/);
//     expect(productNameElements).toHaveLength(1);
//     expect(productNameElements[0]).toHaveTextContent('Product 2');

//     expect(totalValueElement).toHaveTextContent('Total: R$ 20,00');
//   });
// });

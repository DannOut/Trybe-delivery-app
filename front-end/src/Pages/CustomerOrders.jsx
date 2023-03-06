import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Service/api';

import Navbar from '../components/Navbar';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    api.get('/sales', {
      headers: { Authorization: token },
    }).then((response) => {
      setOrders(response.data.sales);
      // console.log(response.data.sales);
    })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);
  return (
    <div>
      <Navbar />
      {orders.map(({ id, totalPrice, status, saleDate }) => (
        <Link to="/customer/orders/:id" key={ id }>
          <div data-testid={ `customer_orders__element-order-id-${id}` }>
            Pedido
            {' '}
            {id}
          </div>
          <div data-testid={ `customer_orders__element-delivery-status-${id}` }>
            {status}
          </div>
          <div>
            <p data-testid={ `customer_orders__element-order-date-${id}` }>
              {new Date(saleDate).getDate()}
              /
              {new Date(saleDate).getMonth() + 1}
              /
              {new Date(saleDate).getFullYear()}
            </p>
            <p data-testid={ `customer_orders__element-card-price-${id}` }>
              R$
              {' '}
              {totalPrice}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

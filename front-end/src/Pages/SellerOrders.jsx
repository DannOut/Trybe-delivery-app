import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Service/api';
import Navbar from '../components/Navbar';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    api
      .get('/sales', {
        headers: { Authorization: token },
      })
      .then((response) => {
        setOrders(response.data.sales);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);
  return (
    <div>
      <Navbar />
      {orders.map(({ id, totalPrice, status, saleDate, deliveryAdress }) => (
        <Link to={ `/seller/orders/${id}` } key={ id }>
          <div data-testid={ `seller_orders__element-order-id-${id}` }>
            Pedido
            {id}
          </div>
          <div data-testid={ `seller_orders__element-delivery-status-${id}` }>
            {status}
          </div>
          <div>
            <p data-testid={ `seller_orders__element-order-date-${id}` }>
              {new Date(saleDate).getDate()}
              /
              {new Date(saleDate).getMonth() + 1}
              /
              {new Date(saleDate).getFullYear()}
            </p>
            <p data-testid={ `seller_orders__element-card-address-${id}` }>
              { deliveryAdress }
            </p>
            <p data-testid={ `seller_orders__element-card-price-${id}` }>
              R$
              {totalPrice}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

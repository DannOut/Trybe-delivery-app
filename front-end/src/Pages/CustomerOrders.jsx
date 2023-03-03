import React, { useEffect } from 'react';
import api from '../Service/api';
// import { useHistory } from 'react-router-dom';
import CheckoutProductsCard from '../components/CheckoutProductsCard';
import Navbar from '../components/Navbar';

export default function CustomerOrders() {
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    api.get('/register',)
  });

  return (
    <div>
      <Navbar />
      {/* linha com dados do pedido */}
      <div>
        <span>Pedido</span>
        <span>Nome</span>
        <span>Data</span>
        <span>Status</span>
        <button type="button">Status de entrega</button>
      </div>
      {/* <CheckoutProductsCard /> */}
      <div>
        <p data-testid="customer_checkout__element-order-total-price">Total: R$ 28,46</p>
        <span>Detalhes do Pedido</span>
      </div>
    </div>
  );
}

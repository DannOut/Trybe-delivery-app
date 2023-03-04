import React, { useEffect, useState } from 'react';
import api from '../Service/api';
// import { useHistory } from 'react-router-dom';
// import CheckoutProductsCard from '../components/CheckoutProductsCard';
import Navbar from '../components/Navbar';

export default function CustomerOrders() {
  const [data, setData] = useState('');
  useEffect(() => {
    // declare the data fetching function

    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    api.get('/sales', {
      headers: { Authorization: token },
    }).then((response) => {
      setData(response);
      console.log(response.data);
    })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {/* linha co dados do pedido */}
      <div>
        <span>Pedido</span>
        <span>Nome</span>
        <span>Data</span>
        <span>Status</span>
        <button type="button">Status de entrega</button>
      </div>
      {/* {data..map(({ id, price, urlImage }) => (
        <CheckoutProductsCard />} */}
      <div>
        <p data-testid="customer_checkout__element-order-total-price">Total: R$ 28,46</p>
        <span>Detalhes do Pedido</span>
      </div>
    </div>
  );
}

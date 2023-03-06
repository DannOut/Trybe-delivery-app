import React, { useEffect, useState } from 'react';
import api from '../Service/api';

// import { useHistory } from 'react-router-dom';
import CheckoutProductsCard from '../components/CheckoutProductsCard';
import Navbar from '../components/Navbar';

export default function CustomerOrderDetail() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // declare the data fetching function

    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    api.get('/sales', {
      headers: { Authorization: token },
    }).then((response) => {
      setSales(response.data.sales);
      console.log(response.data.sales);
    })
      .catch((erro) => {
        console.log(erro);
      });
    api.get('/products', {
      headers: { Authorization: token },
    }).then((response) => {
      setProducts(response.data);
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
      <span>Detalhes do Pedido</span>
      <div>
        <span>Pedido</span>
        <span>Nome</span>
        <span>Data</span>
        <span>Status</span>
        <button type="button">Status de entrega</button>
      </div>
      {sales.map(({ id, totalPrice, status, saleDate }) => (
        <CheckoutProductsCard
          key={ id }
          id={ id }
          totalPrice={ totalPrice }
          status={ status }
          saleDate={ saleDate }
        />
      ))}
    </div>
  );
}

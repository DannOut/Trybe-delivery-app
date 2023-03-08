import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function CustomerOrderDetail() {
  const [saleById, setSaleById] = useState([]);
  // const [products, setProducts] = useState([]);
  const { id } = useParams();

  const { token, name } = JSON.parse(localStorage.getItem('user')) || '';
  useEffect(() => {
    // declare the data fetching function
    const getSaleById = async () => {
      const result = await axios
        .get(`http://localhost:3001/sales/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => response)
        .catch((response) => response);
      setSaleById(result.data);
    };
    getSaleById();
    // api.get('/products', {
    //   headers: { Authorization: token },
    // }).then((response) => {
    //   setProducts(response.data);
    //   console.log(response.data);
    // })
    //   .catch((erro) => {
    //     console.log(erro);
    //   });
  }, [id]);

  return (
    <div>
      <Navbar />
      {/* linha co dados do pedido */}
      <span>Detalhes do Pedido</span>
      <div>
        <span>
          Pedido
          {' '}
          {saleById.id}
        </span>
        <span>{name}</span>
        <span>{saleById.saleDate}</span>
        <span>{saleById.status}</span>
        <button type="button">Marcar como Entregue</button>
      </div>
      {/* {saleById.products.map((sale) => (
        <div key={ sale.id } />
      ))} */}
    </div>
  );
}

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const baseURLProducts = 'http://localhost:3001/products';

  useEffect(() => {
    const axiosProductsRequest = async () => {
      const { token } = JSON.parse(localStorage.getItem('user')) || '';
      const result = await axios
        .get(baseURLProducts, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => response)
        .catch((response) => response);
      setProducts(result.data);
    };
    axiosProductsRequest();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {products.map(({ id, name, price, urlImage }) => (
          <ProductsCard
            key={ id }
            id={ id }
            urlImage={ urlImage }
            name={ name }
            price={ price.replace('.', ',') }
          />
        ))}
      </div>
    </div>
  );
}

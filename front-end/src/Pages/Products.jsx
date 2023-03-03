import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';
import Context from '../context/Context';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { totalPrice, setTotalPrice, order } = useContext(Context);
  const history = useHistory();
  const baseURLProducts = 'http://localhost:3001/products';

  //  Axios request
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

  const getTotalOrderValue = () => {
    const total = order
      .reduce((acc, curr) => acc + parseFloat(curr.price.replace(',', '.')), 0);
    setTotalPrice(total.toFixed(2).replace('.', ','));
  };
  getTotalOrderValue();

  return (
    <div>
      <Navbar />
      <button
        disabled={ !order.length }
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
      >
        {'Valor total: '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {totalPrice}
        </span>
      </button>
      <div>
        { products.map(({ id, name, price, urlImage }) => (
          <ProductsCard
            key={ id }
            id={ id }
            urlImage={ urlImage }
            name={ name }
            price={ price.replace('.', ',') }
            quantity={ 0 }
          />
        ))}
      </div>
    </div>
  );
}

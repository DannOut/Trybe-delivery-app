import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../Service/api';
import styles from './CustomerOrderDetail.module.css';

export default function CustomerOrderDetail() {
  const { id } = useParams();
  const [detailsProducts, setDetailsProducts] = useState({ products: [] });
  const [isDisabled, setisDisabled] = useState(true);
  const [status, setStatus] = useState('');
  const { token } = JSON.parse(localStorage.getItem('user')) || '';
  const BASE_DATA_ID = 'customer_order_details__element';

  const dateFormatter = new Date(detailsProducts.saleDate).toLocaleDateString('pt-BR');
  const { products } = detailsProducts;

  useEffect(() => {
    api.get(`/sales/${id}`, {
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      setDetailsProducts(response.data);

      setStatus(response.data.status);
    });
  }, [id, token]);

  const calculateTotalPrice = (array) => array
    .reduce((acc, { product, quantity }) => {
      const val = product.price * quantity;
      acc += val;
      return acc;
    }, 0).toFixed(2);

  useEffect(() => {
    const checkStatus = detailsProducts.status === 'Em Trânsito';
    setisDisabled(!checkStatus);
  }, [detailsProducts]);

  function handleDeliveryStatus() {
    api.patch(`/sales/${id}`, { status: 'Entregue' }, {
      headers: {
        Authorization: token,
      },
    });
    setStatus('Entregue');
    setisDisabled(true);
  }
  // console.log(detailsProducts);
  // console.log(products);
  // console.log(btnStatusCheck);
  return (
    <div
      className={ styles.content }
      data-testid={ `${BASE_DATA_ID}-order-details-label-order-id` }
    >
      <Navbar />
      <h1>Detalhe do Pedido</h1>

      <div className={ styles.headerOrders }>
        <strong>
          {`PEDIDO ${id}`}
        </strong>
        P. Vend:
        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { detailsProducts.sellerName }
        </span>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { dateFormatter }
        </p>
        <p
          data-testid={
            `${BASE_DATA_ID}-order-details-label-delivery-status${detailsProducts.id}`
          }
        >
          { status }
        </p>
        <button
          type="submit"
          onClick={ handleDeliveryStatus }
          disabled={ isDisabled }
          data-testid="customer_order_details__button-delivery-check"
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Sub-total</th>
          </tr>
        </thead>
        { products.map(({ product, quantity }, index) => (
          <tbody key={ product.id }>
            <tr>
              <td
                data-testid={ `${BASE_DATA_ID}-order-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `${BASE_DATA_ID}-order-table-name-${index}` }
              >
                {product.name}
              </td>
              <td
                data-testid={ `${BASE_DATA_ID}-order-table-quantity-${index}` }
              >
                {quantity}
              </td>
              <td
                data-testid={ `${BASE_DATA_ID}-order-table-unit-price-${index}` }
              >
                R$
                {product.price}
              </td>
              <td
                data-testid={ `${BASE_DATA_ID}-order-table-sub-total-${index}` }
              >
                R$
                {Number(product.price * quantity).toFixed(2)}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <div
        data-testid={ `${BASE_DATA_ID}-order-total-price` }
      >
        { calculateTotalPrice(products).replace('.', ',') || 0 }
      </div>
    </div>
  );
}

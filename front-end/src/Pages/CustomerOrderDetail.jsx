import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../Service/api';
import styles from './CustomerOrderDetail.module.css';

export default function CustomerOrderDetail() {
  const { id } = useParams();
  const [detailsProducts, setDetailsProducts] = useState({ products: [] });
  const [btnStatusCheck, setBtnStatusCheck] = useState(false);
  const [status, setStatus] = useState('');
  const { token } = JSON.parse(localStorage.getItem('user')) || '';

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

  useEffect(() => {
    const checkStatus = detailsProducts.status === 'Pendente';
    setBtnStatusCheck(!checkStatus);
  }, [detailsProducts]);

  function handleDeliveryStatus() {
    api.patch(`/sales/${id}`, { status: 'Entregue' }, {
      headers: {
        Authorization: token,
      },
    });
    setStatus('Entregue');
    setBtnStatusCheck(true);
  }
  console.log(detailsProducts);
  console.log(products);
  console.log(btnStatusCheck);
  return (
    <div>
      <Navbar />
      <h1>Detalhe do Pedido</h1>
      <section className={ styles.content }>
        <div className={ styles.headerOrders }>
          <p>
            <strong
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              PEDIDO 0003:
            </strong>
            P. Vend:
            <span
              data-testid="customer_order_details__
              element-order-details-label-seller-name"
            >
              Fulana Pereira
            </span>
          </p>
          <p
            data-testid="Group customer_order_details__
            element-order-details-label-order-date"
          >
            { dateFormatter }
          </p>
          <p
            data-testid={ `customer_order_details__
            element-order-details-label-delivery-status${detailsProducts.id}` }
          >
            { status }
          </p>
          <button
            type="submit"
            onClick={ handleDeliveryStatus }
            disabled={ btnStatusCheck }
            data-testid="customer_order_details__button-delivery-check"
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>

        <table>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Sub-total</th>
          </tr>
          { products.map(({ product, quantity }, index) => (
            <tr key={ product.id }>
              <td
                data-testid={ `customer_order_details__
                element-order-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-name-${index}` }
              >
                {product.name}
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-quantity-${index}` }
              >
                {quantity}
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-unit-price-${index}` }
              >
                R$
                {product.price}
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-sub-total-${index}` }
              >
                R$
                {Number(product.price * quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </table>
      </section>
    </div>
  );
}

import React, { useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../Service/api';
import Navbar from '../components/Navbar';
import { baseDetailsSeller, ORDER_SENT, PREPARING } from '../utils/Const';
import Context from '../context/Context';

export default function SellerOrdersDetails({ match: { params: { id } } }) {
  const [order, setOrder] = useState(baseDetailsSeller);
  const [sentDelivery, setSentDelivery] = useState(true);
  const [preparingOrder, setPreparingOrder] = useState(false);
  const BASE_TESTID = 'seller_order_details__';
  const { status, setStatus } = useContext(Context);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    api
      .get(`/sales/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setOrder(response.data);
        setStatus(response.data.status);
      })
      .catch((erro) => {
        console.log(erro);
      });

    if (status === 'Pendente') {
      setPreparingOrder(false);
      setSentDelivery(true);
    }
    if (status === 'Preparando') {
      setPreparingOrder(true);
      setSentDelivery(false);
    }
  }, [status]);

  const changeStatus = async (e) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    api
      .patch(`/sales/${id}`, { status: e.target.value }, {
        headers: { Authorization: token },
      })
      .then(() => {
        if (e.target.value === ORDER_SENT) {
          setSentDelivery(true);
          setPreparingOrder(false);
          setStatus(e.target.value);
        }
        if (e.target.value === PREPARING) {
          setSentDelivery(false);
          setPreparingOrder(true);
          setStatus(e.target.value);
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const calculateTotalPrice = (array) => array
    .reduce((acc, { product, quantity }) => {
      const val = product.price * quantity;
      acc += val;
      return acc;
    }, 0).toFixed(2);

  return (
    <div data-testid={ `${BASE_TESTID}element-order-details-label-order-id` }>
      <Navbar />
      <h2>
        Detalhe do Pedido
      </h2>
      <div>
        <h3>{`PEDIDO ${id}`}</h3>
        <h4 data-testid="seller_order_details__element-order-details-label-order-date">
          {new Date(order.saleDate).toLocaleDateString('pt-BR')}
        </h4>
        <h5
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          {status}
        </h5>
        <button
          type="submit"
          value={ PREPARING }
          data-testid="seller_order_details__button-preparing-check"
          placeholder="Preparar Pedido"
          onClick={ changeStatus }
          disabled={
            preparingOrder || (order.status === ORDER_SENT || order.status === PREPARING)
          }
        >
          Preparar Pedido
        </button>
        <button
          type="submit"
          value={ ORDER_SENT }
          data-testid="seller_order_details__button-dispatch-check"
          placeholder="Saiu para Entrega"
          onClick={ changeStatus }
          disabled={ sentDelivery }
        >
          Saiu para Entrega
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th> Item </th>
            <th> Descrição </th>
            <th> Quantidade </th>
            <th> Valor Unitário </th>
            <th> Sub-total </th>
          </tr>
        </thead>
        {order.products.map(({ quantity, product }, index) => (
          <tbody key={ index }>
            <tr>
              <td
                data-testid={ `${BASE_TESTID}element-order-table-item-number-${index}` }
              >
                {product.id}
              </td>
              <td
                data-testid={ `${BASE_TESTID}element-order-table-name-${index}` }
              >
                {product.name}
              </td>
              <td
                data-testid={ `${BASE_TESTID}element-order-table-quantity-${index}` }
              >
                {quantity}
              </td>
              <td
                data-testid={ `${BASE_TESTID}element-order-table-unit-price-${index}` }
              >
                {product.price}
              </td>
              <td
                data-testid={ `${BASE_TESTID}element-order-table-sub-total-${index}` }
              >
                { (product.price * quantity).toFixed(2) }
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <div
        data-testid={ `${BASE_TESTID}element-order-total-price` }
      >
        { calculateTotalPrice(order.products).replace('.', ',') || 0 }
      </div>
    </div>
  );
}

SellerOrdersDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired }).isRequired,
};

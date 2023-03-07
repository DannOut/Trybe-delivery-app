import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../Service/api';
import Navbar from '../components/Navbar';
import { baseDetailsSeller, ORDER_SENT, SLICE_DATE, PREPARING } from '../utils/Const';

export default function SellerOrdersDetails({ match: { params: { id } } }) {
  const [order, setOrder] = useState(baseDetailsSeller);
  const [isDisOrderSent, setIsDisOrderSent] = useState(false);
  const [isDisPrepOrd, setIsDisPrepOrd] = useState(false);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    api
      .get(`/sales/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, [id]);

  const changeStatus = async (e) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    api
      .patch(`/sales/${id}`, { status: e.target.value }, {
        headers: { Authorization: token },
      })
      .then(() => {
        if (e.target.value === ORDER_SENT) {
          setIsDisOrderSent(true);
        }
        if (e.target.value === PREPARING) {
          setIsDisPrepOrd(true);
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <div>
      <Navbar />
      <h2
        data-testid={ `seller_order_details__element-order-details-label-order-${id}` }
      >
        Detalhe do Pedido
      </h2>
      <div>
        <h3>{`PEDIDO ${id}`}</h3>
        <h4 data-testid="seller_order_details__element-order-details-label-order-date">
          {order.saleDate.slice(0, SLICE_DATE)}
        </h4>
        <h5>{order.status}</h5>
        <button
          type="submit"
          value={ PREPARING }
          data-testid="seller_order_details__button-preparing-check"
          placeholder="Preparar Pedido"
          onClick={ changeStatus }
          disabled={
            isDisPrepOrd || (order.status === ORDER_SENT || order.status === PREPARING)
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
          disabled={ isDisOrderSent || order.status === ORDER_SENT }
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
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{quantity}</td>
              <td>{ product.price }</td>
              <td>{ (product.price * quantity).toFixed(2) }</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

SellerOrdersDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired }).isRequired,
};

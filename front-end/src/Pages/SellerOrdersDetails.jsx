import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../Service/api';
import Navbar from '../components/Navbar';

export default function SellerOrdersDetails({ match: { params: { id } } }) {
  // const history = useHistory();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    api
      .get('/sales', {
        headers: { Authorization: token },
        params: {
          ID: id,
        } })
      .then((response) => {
        setOrder(response.data.sales);
      })
      .catch((erro) => {
        console.log(erro);
      });
    console.log(order);
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <h2
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          Detalhe do Pedido
        </h2>
        <div>
          Pedido
        </div>
        <div
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          Data
        </div>
        <div
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          Status
        </div>
        <button
          type="submit"
          data-testid="seller_order_details__button-preparing-check"
          placeholder="Preparar Pedido"
        >
          Preparar Pedido
        </button>
        <button
          type="submit"
          data-testid="seller_order_details__button-dispatch-check"
          placeholder="Status de Entrega"
        >
          Status de Entrega
        </button>
        <table>
          <th>
            Item
            Descrição
            Quantidade
            Valor Unitário
            Sub-Total
          </th>
          <tr data-testid="">
            {}
          </tr>
        </table>
      </div>
      <div
        data-testid="seller_order_details__element-order-total-price"
      >
        Total
        {}
      </div>
    </>
  );
}

SellerOrdersDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
  // id: PropTypes.string.isRequired,
};

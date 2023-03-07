import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../Service/api';
import Navbar from '../components/Navbar';

export default function SellerOrdersDetails({ match: { params: { id } } }) {
  // const history = useHistory();
  const [order, setOrder] = useState({ products: [] });
  const [isDisabled, setIsDisabled] = useState(false);

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
        if (e.target.value === 'Em Trânsito') {
          setIsDisabled(true);
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
      {order.products.map(({ id: orderId, totalPrice, saleDate, status }, index) => (
        <div key={ index.toString() }>
          <div>
            Pedido
            { orderId }
          </div>
          <div
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            Data
            {saleDate}
          </div>
          <button
            type="submit"
            value="Preparando"
            data-testid="seller_order_details__button-preparing-check"
            placeholder="Preparar Pedido"
            onClick={ changeStatus }
            disabled={ isDisabled }
          >
            Preparar Pedido
          </button>
          <button
            type="submit"
            value="Em Trânsito"
            data-testid="seller_order_details__button-dispatch-check"
            placeholder="Saiu para Entrega"
            onClick={ changeStatus }
            disabled={ isDisabled }
          >
            Saiu para Entrega
            {status}
          </button>
          <div
            data-testid="seller_order_details__element-order-total-price"
          >
            Total
            {totalPrice}
          </div>
        </div>
      ))}
    </div>
  );
}

SellerOrdersDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired }).isRequired,
};

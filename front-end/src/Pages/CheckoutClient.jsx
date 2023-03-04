import React, { useContext, useState, useEffect } from 'react';
// import axios from 'axios';
import Navbar from '../components/Navbar';
import Context from '../context/Context';

export default function CheckoutClient() {
  const { totalPrice, order } = useContext(Context);
  const [showOrder, setShowOrder] = useState([]);

  useEffect(() => {
    const novoObjeto = {};
    order.forEach(({ id, price, name }) => {
      if (!novoObjeto[id]) {
        novoObjeto[id] = {
          id,
          price,
          name,
          totalValue: price,
          quantity: 0,
        };
      }

      novoObjeto[id].price = parseFloat(price);
      novoObjeto[id].totalValue += parseFloat(price);
      novoObjeto[id].quantity += 1;
    });
    const novoArray = Object.values(novoObjeto).map((obj) => {
      const price = parseFloat(obj.price).toFixed(2).replace('.', ',');
      const totalValue = (
        parseFloat(obj.totalValue) * obj.quantity
      ).toFixed(2).replace('.', ',');

      return {
        ...obj,
        price,
        totalValue,
      };
    });
    setShowOrder(novoArray);
  }, [order]);

  return (
    <div>
      <Navbar />
      <p>Finalizar Pedido</p>
      <div>
        <span>Item</span>
        <span>Descrição</span>
        <span>Quantidade</span>
        <span>Valor unitário</span>
        <span>Sub-total</span>
        <span>Remover Item</span>
        {showOrder.map((item, i) => (
          <div key={ i }>
            <span
              data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
            >
              {i}
            </span>
            <p
              data-testid={ `customer_checkout__element-order-table-name-${i}` }
            >
              {item.name}

            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
            >
              {item.quantity}

            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
            >
              {item.price}

            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
            >
              {item.totalValue}

            </p>
            <button
              type="button"
              data-testid={ `customer_checkout__element-order-table-remove-${i}` }
            >
              Remover

            </button>
          </div>
        ))}
      </div>
      <div>
        <p data-testid="customer_checkout__element-order-total-price">
          Total: R$
          {' '}
          {totalPrice}
        </p>
        <span>Detalhes e Endereço de Entrega</span>
        <label htmlFor="seller">
          Vendedora Responsável
          <select id="estado" name="estado">
            <option
              value="Fulana Pereira"
              data-testid="customer_checkout__select-seller"
            >
              Fulana Pereira
            </option>
          </select>
        </label>
        <form>
          <label htmlFor="endereco">
            Endereço
            <input
              type="text"
              placeholder="Digite o endereço"
              data-testid="customer_checkout__input-address"
            />
          </label>
          <label htmlFor="number">
            Número
            <input
              type="text"
              placeholder="Digite o número"
              data-testid="customer_checkout__input-address-number"
            />
          </label>
          <button
            data-testid="customer_checkout__button-submit-order"
            type="submit"
          >
            Finalizar
          </button>
        </form>
      </div>
      {/* Enviar para o Lucas */}
    </div>
  );
}

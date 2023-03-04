import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Context from '../context/Context';

export default function CheckoutClient() {
  const { order } = useContext(Context);
  const [showOrder, setShowOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();

  const handleRemoveItem = (itemId) => {
    const updatedOrder = showOrder.filter((item) => item.id !== itemId);
    let totalValue = 0;
    updatedOrder.forEach(({ price, quantity }) => {
      totalValue += parseFloat(price) * quantity;
    });
    setTotalPrice(totalValue.toFixed(2).replace('.', ','));
    setShowOrder(updatedOrder);
    console.log(updatedOrder);
  };

  useEffect(() => {
    const newArray = [];
    let totalValue = 0;

    order.forEach(({ id, price, name }) => {
      const index = newArray.findIndex((obj) => obj.id === id);
      const negativeIndex = -1;
      if (index === negativeIndex) {
        const newObj = {
          id,
          price: parseFloat(price),
          name,
          quantity: 1,
        };
        newObj.totalValue = parseFloat(Math
          .floor(newObj.price * newObj.quantity * 100) / 100)
          .toFixed(2).replace('.', ',');
        newArray.push(newObj);
        totalValue += newObj.price;
      } else {
        newArray[index].quantity += 1;
        newArray[index].totalValue = parseFloat(Math
          .floor(newArray[index].price * newArray[index].quantity * 100) / 100)
          .toFixed(2).replace('.', ',');
        totalValue += newArray[index].price;
      }
    });

    setShowOrder(newArray);
    setTotalPrice(totalValue.toFixed(2).replace('.', ','));
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.pushState('/');
  };

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
      </div>
      <div>
        {showOrder.map((item, i) => (
          <div key={ i }>
            <span
              data-testid={
                `customer_checkout__element-order-table-item-number-${i}`
              }
            >
              {i + 1}
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
              {parseFloat(item.price).toFixed(2).replace('.', ',')}

            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
            >
              {item.totalValue}

            </p>
            <button
              type="button"
              data-testid={ `customer_checkout__element-order-table-remove-${i}` }
              onClick={ () => handleRemoveItem(item.id) }
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
          <select
            id="estado"
            name="estado"
            data-testid="customer_checkout__select-seller"
          >
            <option value="Fulana Pereira">
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
            onSubmit={ () => handleSubmit(e) }
          >
            Finalizar
          </button>
        </form>
      </div>
      {/* Enviar para o Lucas */}
    </div>
  );
}

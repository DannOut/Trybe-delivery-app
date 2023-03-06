import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Context from '../context/Context';

export default function CheckoutClient() {
  const { order, form, setForm } = useContext(Context);
  const [showOrder, setShowOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellers, setSellers] = useState([]);
  const history = useHistory();

  const baseURLSellers = 'http://localhost:3001/sales/sellers';

  const handleRemoveItem = (itemId) => {
    const updatedOrder = showOrder.filter((item) => item.id !== itemId);
    let totalValue = 0;
    updatedOrder.forEach(({ price, quantity }) => {
      totalValue += parseFloat(price) * quantity;
    });
    setTotalPrice(totalValue.toFixed(2).replace('.', ','));
    setShowOrder(updatedOrder);
  };

  useEffect(() => {
    const allSellers = async () => {
      const { token } = JSON.parse(localStorage.getItem('user')) || '';
      const result = await axios
        .get(baseURLSellers, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => response)
        .catch((response) => response);
      setSellers(result.data);
    };
    allSellers();
    console.log(sellers);
  }, [sellers]);

  useEffect(() => {
    const newArray = [];
    let totalValue = 0;
    setForm({});
    // const allSellers = async () => {
    //   const { token } = JSON.parse(localStorage.getItem('user')) || '';
    //   const result = await axios
    //     .get(baseURLSellers, {
    //       headers: {
    //         Authorization: token,
    //       },
    //     })
    //     .then((response) => response)
    //     .catch((response) => response);
    //   setSellers(result.data);
    // };
    // allSellers();
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
  }, [order, setForm]);

  function handleChange({ target }) {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

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
            id="seller"
            name="seller"
            value={ form.seller }
            onChange={ handleChange }
            data-testid="customer_checkout__select-seller"
          >
            <option selected value> -- Selecione o vendedor -- </option>
            <option value="Fulana Pereira">
              Fulana Pereira
            </option>
          </select>
        </label>
        <form>
          <label htmlFor="address">
            Endereço
            <input
              type="text"
              id="address"
              name="address"
              value={ form.address }
              onChange={ handleChange }
              placeholder="Digite o endereço"
              data-testid="customer_checkout__input-address"
            />
          </label>
          <label htmlFor="number">
            Número
            <input
              type="number"
              id="number"
              name="number"
              value={ form.number }
              onChange={ handleChange }
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

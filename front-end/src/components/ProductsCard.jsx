import React, { useContext, useState, useEffect } from 'react';
import { string, number } from 'prop-types';
import Context from '../context/Context';

//  prettier-ignore
function ProductsCard({ id, name, urlImage, price }) {
  const { order, setOrder, setTotalQuantity } = useContext(Context);

  // quantity for each item
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const quantityByProduct = order.filter(
      (orderByProduct) => orderByProduct.id === id,
    ).length;
    setQuantity(quantityByProduct);
    setTotalQuantity(order.length);
  }, [order, id]);

  const addOrder = ({ target: { value } }) => {
    setQuantity(value);
    const productNotInOrders = order.filter((orderId) => orderId !== id);
    const newProduct = [];
    for (let i = 1; i <= value; i += 1) {
      newProduct.push({ id, name, urlImage, price });
    }
    setOrder([...productNotInOrders, ...newProduct]);
  };

  const removeOrder = (productId) => {
    const withTheProduct = order
      .filter((orderByProduct) => orderByProduct.id === productId);
    withTheProduct.pop();
    const withoutProduct = order
      .filter((orderByProduct) => orderByProduct.id !== productId);
    setOrder([...withoutProduct, ...withTheProduct]);
  };

  return (
    <section data-testid="products">
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        R$
        {price}
      </p>
      <img
        src={ urlImage }
        alt={ name }
        height="100px"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
      <section>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          name="decreaseButton"
          onClick={ () => removeOrder(id) }
        >
          -
        </button>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          name="quantity"
          onChange={ (e) => addOrder(e) }
          value={ quantity }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          name="increaseButton"
          onClick={ () => setOrder([...order,
            { id, name, urlImage, price }]) }
        >
          +
        </button>
      </section>
    </section>
  );
}

ProductsCard.propTypes = {
  id: number,
  name: string,
  urlImage: string,
  price: string,
}.isRequired;

export default ProductsCard;

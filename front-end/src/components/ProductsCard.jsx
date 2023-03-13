import React, { useContext, useState, useEffect } from 'react';
import { act } from '@testing-library/react';
import { string, number } from 'prop-types';
import Context from '../context/Context';
import styles from '../css/ProductsCard.module.css';

function ProductsCard({ id, name, urlImage, price }) {
  const { order, setOrder } = useContext(Context);

  // quantity for each item
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    act(() => {
      const quantityByProduct = order.filter(
        (orderByProduct) => orderByProduct.id === id,
      ).length;
      setQuantity(quantityByProduct);
      /* fire events that update state */
    });
  }, [order, id]);

  const handleInput = ({ target: { value } }) => {
    setQuantity(value);
    const productsWithDifferentId = order.filter((orderId) => orderId !== id);
    const newProduct = [];
    for (let i = 1; i <= value; i += 1) {
      newProduct.push({ id, name, urlImage, price });
    }
    setOrder([...productsWithDifferentId, ...newProduct]);
  };

  const handleDecrement = (productId) => {
    const productsWithSameId = order
      .filter((orderByProduct) => orderByProduct.id === productId);
    productsWithSameId.pop();
    const productsWithDifferentId = order
      .filter((orderByProduct) => orderByProduct.id !== productId);
    setOrder([...productsWithDifferentId, ...productsWithSameId]);
  };

  return (
    <section className={ styles.content } data-testid="products">

      <div className={ styles.thumbnail }>
        <img
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </div>
      <div className={ styles.infoProducts }>
        <p
          className={ styles.price }
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          R$
          {price.replace('.', ',')}
        </p>
        <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
      </div>
      <section className={ styles.qtd }>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          name="decreaseButton"
          onClick={ () => handleDecrement(id) }
        >
          -
        </button>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          name="quantity"
          onChange={ (e) => handleInput(e) }
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

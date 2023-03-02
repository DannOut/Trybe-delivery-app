import React from 'react';
import { string, number } from 'prop-types';

//  prettier-ignore
function ProductsCard({ id, name, urlImage, price }) {
  console.log('urlImage :>> ', urlImage);
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
          onClick={ (e) => onClick(e) }
        >
          -
        </button>
        <input
          type="text"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          name="quantity"
          value={ 0 }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          name="increaseButton"
          onClick={ (e) => onClick(e) }
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

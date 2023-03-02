import React from 'react';
import { string, number } from 'prop-types';

//  prettier-ignore
function ProductsCard({ id, name, urlImage, price }) {
  console.log('urlImage :>> ', urlImage);
  return (
    <div>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {price}
      </p>
      <img
        src={ urlImage }
        alt={ name }
        height="100px"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </p>
    </div>
  );
}

ProductsCard.propTypes = {
  id: number,
  name: string,
  urlImage: string,
  price: string,
}.isRequired;

export default ProductsCard;

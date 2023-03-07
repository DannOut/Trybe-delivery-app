import React from 'react';

export default function CheckoutProductsCard() {
  return (
    <div>
      <span>Finalizar Pedido</span>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th data-testid="customer_checkout__element-order-table-item-number-<index>">
              1
            </th>
            <th data-testid="customer_checkout__element-order-table-name-<index>">
              Cerveja Skol
            </th>
            <th data-testid="customer_checkout__element-order-table-quantity-<index>">
              3
            </th>
            <th data-testid="customer_checkout__element-order-table-unit-price-<index>">
              R$4,10
            </th>
            <th data-testid="customer_checkout__element-order-table-sub-total-<index>">
              R$16,30
            </th>
            <th data-testid="customer_checkout__element-order-table-remove-<index>">
              Test
            </th>
          </tr>
          {/* {(filteredList.length === 0 ? data : filteredList).map((obj, index) => (
            <tr key={ index }>
              {Object.values(obj).map((value, i) => (
                <td key={ i }>{value}</td>
              ))}
            </tr>
          ))} */}
        </tbody>
      </table>

      <section data-testid="products">
        {/* <p data-testid={ `customer_products__element-card-price-${id}` }>
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
          <input
            type="text"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            name="quantity"
            value={ 0 }
          /> */}
        <button
          // data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          name="increaseButton"
          // onClick={ (e) => onClick(e) }
        >
          Remover
        </button>
        {/* </section> */}
      </section>
    </div>
  );
}

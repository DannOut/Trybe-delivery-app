import React from 'react';

export default function CheckoutClient() {
  return (
    <div
      id="sellers"
      data-testid="customer_checkout__select-seller"
    >
      <h1>Checkout do Cliente</h1>
      <table>
        <div testId="customer_checkout__input-address">{}</div>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Preço</th>
          </tr>
        </thead>
        <div testId="customer_checkout__input-address-number">{}</div>
      </table>
      <button type="button">Finalizar Compra</button>
      <div data-testid="customer_checkout__button-submit-order">{}</div>
      <div data-testid="customer_checkout__error-message">{}</div>
    </div>
  );
}

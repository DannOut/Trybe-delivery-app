import React from 'react';
import axios from 'axios';

export default function CheckoutClient({ cartItems, total }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    axios.post('http://localhost:3001/login', { cartItems, total, name, address, payment })
      .then(() => setIsSubmitted(true))
      .catch((error) => console.log(error))
      .finally(() => setIsSubmitting(false));
  };

  if (isSubmitted) {
    return <div>Thank you for your order!</div>;
  }

  return (
    <div
      id="sellers"
      data-testid="customer_checkout__select-seller"
    >
      <form onSubmit={ handleSubmit } />
      <h1>Checkout do Cliente</h1>
      {cartItems.map((item) => (
        <div key={ item.id }>
          <span>{item.name}</span>
          <span>{item.price}</span>
          <input
            id="name"
            name="name"
            type="text"
            value={ name }
            onChange={ (event) => setName(event.target.value) }
          />
        </div>
      ))}
      <table>
        <div testId="customer_checkout__input-address">{}</div>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Preço</th>
          </tr>
        </thead>
        <div testId="customer_checkout__input-address-number">Address</div>
        <input
          id="address"
          name="address"
          type="text"
          value={ address }
          onChange={ (event) => setAddress(event.target.value) }
        />
      </table>
      <div>
        <div type="payment">Payment method</div>
        <input
          id="payment"
          name="payment"
          type="text"
          value={ payment }
          onChange={ (event) => setPayment(event.target.value) }
        />
      </div>
      <button type="button">Finalizar Compra</button>
      <div data-testid="customer_checkout__button-submit-order">{}</div>
      <button type="submit" disabled={ isSubmitting }>
        {isSubmitting ? 'Submitting...' : 'Confirm Order'}
      </button>
      <div data-testid="customer_checkout__error-message">{}</div>
    </div>
  );
}

CheckoutClient.propTypes = {
  cartItems: PropTypes.node.isRequired,
  total: PropTypes.number.isRequired,
};

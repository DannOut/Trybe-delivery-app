import React from 'react';
import CheckoutProductsCard from '../components/CheckoutProductsCard';
// import CheckoutProductsCard from '../components/CheckoutProductsCard';
// import axios from 'axios';
import Navbar from '../components/Navbar';

export default function CheckoutClient() {
  // const [page, setPage] = useState('');
  // const [name, setName] = useState('');
  // const [address, setAddress] = useState('');
  // const [payment, setPayment] = useState('');
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  //   axios.post('http://localhost:3001/login', { cartItems, total, name, address, payment })
  //     .then(() => setIsSubmitted(true))
  //     .catch((error) => console.log(error))
  //     .finally(() => setIsSubmitting(false));
  // };
  // if (isSubmitted) {
  //   return <div>Thank you for your order!</div>;
  // }

  return (
    <div>
      <Navbar />
      {/* <div>
        {products.map(({ id, name, price }) => (
          <CheckoutProductsCard
            key={ id }
            id={ id }
            name={ name }
            price={ price.replace('.', ',') }
          />
        ))}
      </div> */}
      <CheckoutProductsCard />
      <div>
        <p data-testid="customer_checkout__element-order-total-price">Total: R$ 28,46</p>
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

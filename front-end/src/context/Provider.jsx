import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [message, setMessage] = useState('');

  const [order, setOrder] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const value = React.useMemo(
    () => ({
      form,
      setForm,
      message,
      setMessage,
      order,
      setOrder,
      totalQuantity,
      setTotalQuantity,
      totalPrice,
      setTotalPrice,
    }),
    [
      form,
      setForm,
      message,
      setMessage,
      order,
      setOrder,
      totalQuantity,
      setTotalQuantity,
      totalPrice,
      setTotalPrice,
    ],
  );
  return <Context.Provider value={ value }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

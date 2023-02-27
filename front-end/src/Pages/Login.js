import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const validateEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi;
    const minPassword = 7;
    if (validateEmail.test(form.email) && form.password.length >= minPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form.email, form.password, form]);

  function handleChange({ target }) {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit() {

  }

  return (
    <div className="style">
      <input
        data-testid="common_login__input-email"
        type="email"
        name="email"
        placeholder="email"
        value={ form.email }
        onChange={ handleChange }
      />
      <input
        data-testid="common_login__input-password"
        type="password"
        name="password"
        placeholder="password"
        value={ form.password }
        onChange={ handleChange }
      />
      <Link to="/foods">
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={ disabled }
          onClick={ handleSubmit }
        >
          LOGIN
        </button>
      </Link>
      <button
        data-testid="common_login__button-register"
        type="button"
        disabled={ disabled }
        onClick={ handleSubmit }
      >
        Ainda não tenho conta
      </button>
    </div>
  );
}

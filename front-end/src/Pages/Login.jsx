import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Context from '../context/Context';

export default function Login() {
  const {
    form,
    setForm,
    message,
    setMessage,
  } = useContext(Context);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  const baseURL = 'http://localhost:3001/login';
  const NOTFOUND = 404;

  const redirectBasedInRole = (role) => {
    if (role === 'customer') {
      history.push('/customer/products');
      return;
    }
    if (role === 'seller') {
      history.push('/seller/orders');
      return;
    }
    if (role === 'administrator') {
      history.push('/admin/manage');
    }
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem('user');
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      redirectBasedInRole(data.role);
    }
  }, []);

  useEffect(() => {
    const validateEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi;
    const minPassword = 6;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(baseURL, ({
      email: form.email, password: form.password,
    }))
      .then((response) => response).catch(({ response }) => response);
    if (result.status !== NOTFOUND) {
      localStorage.setItem('user', JSON.stringify(result.data));
      act(() => {
        setForm({
          ...form,
          password: '',
        });
      });
      redirectBasedInRole(result.data.role);
    } else {
      setMessage('Invalid email or password');
    }
  };

  return (
    <form className="" onSubmit={ (e) => handleSubmit(e) }>
      <div className="style">
        <label htmlFor="email">
          Email:
          <input
            data-testid="common_login__input-email"
            type="email"
            name="email"
            placeholder="email"
            value={ form.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="common_login__input-password"
            type="password"
            name="password"
            placeholder="password"
            value={ form.password }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ disabled }
        >
          LOGIN
        </button>
        <Link to="/register">
          <button
            data-testid="common_login__button-register"
            type="button"
          >
            Ainda não tenho conta
          </button>
        </Link>
        <span data-testid="common_login__element-invalid-email">
          { message }
        </span>
      </div>
    </form>
  );
}

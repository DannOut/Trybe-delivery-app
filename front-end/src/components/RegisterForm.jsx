import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import api from '../Service/api';
import Context from '../context/Context';
// import { useHistory } from 'react-router-dom';

export default function RegisterForm({ getUsers }) {
  // const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const { form, setForm, message, setMessage } = useContext(Context);
  const { token } = JSON.parse(localStorage.getItem('user')) || '';

  async function handleSubmitNewRegister(event) {
    event.preventDefault();
    const { name, email, password, role } = form;
    const data = {
      name,
      email,
      password,
      role,
    };

    try {
      await api.post(
        '/manage',
        data,
        { headers: {
          Authorization: token,
        } },
      );
    } catch (err) {
      if (!err?.response) {
        setMessage('No Server Response');
      } else {
        setMessage(err.response.data.message);
      }
    }
    getUsers();
  }

  function handleChange({ target }) {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  useEffect(() => {
    const MIN_CARACTERE_NAME = 12;
    const MIN_CARACTERE_PASS = 6;
    const validateEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi;

    const { name, email, password, role } = form;
    if (
      name.length >= MIN_CARACTERE_NAME
      && password.length >= MIN_CARACTERE_PASS
      && validateEmail.test(email)
      && role
    ) {
      setDisabled(false);
    }
  }, [form]);

  return (
    <section>
      <h1>Cadastro</h1>
      <form
        onSubmit={ (event) => {
          handleSubmitNewRegister(event);
        } }
      >
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            value={ form.name }
            onChange={ handleChange }
            placeholder="Seu nome"
            data-testid="admin_manage__input-name"
          />
        </label>

        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            onChange={ handleChange }
            placeholder="seu-email@site.com.br"
            data-testid="admin_manage__input-email"
          />
        </label>

        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            onChange={ handleChange }
            placeholder="**********"
            data-testid="admin_manage__input-password"
          />
        </label>

        <label htmlFor="role">
          <select
            name="role"
            id="role"
            data-testid="admin_manage__select-role"
            value={ form.role }
            onChange={ handleChange }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>

        <button
          disabled={ disabled }
          type="submit"
          data-testid="admin_manage__button-register"
        >
          CADASTRAR
        </button>
      </form>
      <span data-testid="admin_manage__element-invalid-register">
        {message}
      </span>
    </section>
  );
}

RegisterForm.propTypes = {
  getUsers: PropTypes.func.isRequired,
};

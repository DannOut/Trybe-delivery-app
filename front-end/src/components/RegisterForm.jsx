import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function RegisterForm() {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [formRegister, setFormRegister] = useState({
    name: '',
    email: '',
    password: '',
  });

  async function handleSubmitNewRegister(event) {
    event.preventDefault();
    const { name, email, password } = formRegister;
    const data = {
      name,
      email,
      password,
    };

    try {
      const response = await api.post(
        '/register',
        JSON.stringify({ ...data }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      console.log(response);
      history.push('/customer/products');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg(err.response.data.message);
      }
    }
  }

  function handleChange({ target }) {
    const { name, value } = target;
    setFormRegister({ ...formRegister, [name]: value });
  }

  useEffect(() => {
    const MIN_CARACTERE_NAME = 12;
    const MIN_CARACTERE_PASS = 6;
    const validateEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi;

    const { name, email, password } = formRegister;
    if (
      name.length >= MIN_CARACTERE_NAME
      && password.length >= MIN_CARACTERE_PASS
      && validateEmail.test(email)
    ) {
      setDisabled(false);
    }
  }, [formRegister]);
  return (
    <section>
      <h1>Cadastro</h1>
      <form
        onSubmit={ (event) => {
          handleSubmitNewRegister(event);
        } }
        action=""
      >
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            value={ formRegister.name }
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

        {/* <label htmlFor="role">
          <select
            name="role"
            id="role"
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ (e) => setRole(e.target.value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label> */}

        <button
          disabled={ disabled }
          type="submit"
          data-testid="admin_manage__button-register"
        >
          CADASTRAR
        </button>
      </form>
      <span data-testid="admin_manage__element-invalid-register">
        {errMsg}
      </span>
    </section>
  );
}

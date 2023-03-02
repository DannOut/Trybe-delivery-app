import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Login from '../Pages/Login';
import renderWithRouter from '../utils/RenderWithRouter';
import App from '../App';

const COMMON_LOGIN_INPUT_EMAIL = 'common_login__input-email';
const COMMON_LOGIN_INPUT_PASSWORD = 'common_login__input-password';
const COMMON_LOGIN_BUTTON_LOGIN = 'common_login__button-login';
const COMMON_LOGIN_BUTTON_REGISTER = 'common_login__button-register';

describe('Testando a página de Login', () => {
  it('Desativa o botão de login quando o e-mail for inválido', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    const passwordInput = getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    const loginButton = getByTestId(COMMON_LOGIN_BUTTON_LOGIN);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    expect(loginButton).toBeDisabled();
  });

  it('Ativa o botão de login quando o e-mail e a senha forem válidos', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    const passwordInput = getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    const loginButton = getByTestId(COMMON_LOGIN_BUTTON_LOGIN);

    fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    expect(loginButton).toBeEnabled();
  });

  it('Navega para "/foods" ao clicar no botão de login', () => {
    const { getByTestId, history } = renderWithRouter(<Login />, { route: '/login' });

    const emailInput = getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    const passwordInput = getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    const loginButton = getByTestId(COMMON_LOGIN_BUTTON_LOGIN);

    fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    fireEvent.click(loginButton);

    expect(history.location.pathname).toBe('/foods');
  });

  it('Os data-testid existem', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    const password = getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    const loginButton = getByTestId(COMMON_LOGIN_BUTTON_LOGIN);
    const buttonRegister = getByTestId(COMMON_LOGIN_BUTTON_REGISTER);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    expect(buttonRegister).toBeInTheDocument();
  });

  it('Se navega para a página de login', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkElement = screen.getByRole('link', { name: /login/i });
    expect(linkElement).toBeInTheDocument();
  });
});

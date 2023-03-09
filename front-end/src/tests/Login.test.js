/* eslint-disable import/named */
import React from 'react';
// import axios from 'axios';
import { screen, fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Login from '../Pages/Login';
import App from '../App';
import renderWithRouter from '../utils/RenderWithRouter';
import mockToken from './mocks/User.mock';
import Redirect from '../Pages/RedirectToLogin';
// import productsMock from './mocks/Products.mock';

jest.mock('axios');

const COMMON_LOGIN_INPUT_EMAIL = 'common_login__input-email';
const COMMON_LOGIN_INPUT_PASSWORD = 'common_login__input-password';
const COMMON_LOGIN_BUTTON_LOGIN = 'common_login__button-login';
const COMMON_LOGIN_BUTTON_REGISTER = 'common_login__button-register';
const email2 = 'zebirita@email.com';
const password2 = '$#zebirita#$';

describe('Testando a página de Login', () => {
  it('01- Desativa o botão de login quando o e-mail for inválido', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const emailInput = getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    const passwordInput = getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    const loginButton = getByTestId(COMMON_LOGIN_BUTTON_LOGIN);

    fireEvent.change(emailInput, { target: { value: 'Invalid email or password' } });
    fireEvent.change(passwordInput, { target: { value: 'Invalid email or password' } });

    expect(loginButton).toBeDisabled();
  });

  it('02- Ativa o botão de login quando o e-mail e a senha forem válidos', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    const passwordInput = getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    const loginButton = getByTestId(COMMON_LOGIN_BUTTON_LOGIN);

    fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    expect(loginButton).toBeEnabled();
  });

  it('03- Os data-testid existem', () => {
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

  it('04- Se navega para a página de registro', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    const password = screen.getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    const loginButton = screen.getByTestId(COMMON_LOGIN_BUTTON_LOGIN);
    const buttonRegister = screen.getByTestId(COMMON_LOGIN_BUTTON_REGISTER);

    expect(loginButton).toHaveProperty('disabled', true);
    userEvent.type(email, email2);
    userEvent.type(password, password2);
    localStorage.setItem('user', mockToken);

    userEvent.click(loginButton);
    userEvent.click(buttonRegister);

    expect(history.location.pathname).toBe('/register');
  });

  it('05- Redireciona para /login', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Redirect />
      </Router>,
    );
    expect(history.location.pathname).toEqual('/login');
  });

  // it('Redireciona para a tela de products.', () => {
  //   const { history } = renderWithRouter(<App />);

  //   const email = screen.getByTestId(COMMON_LOGIN_INPUT_EMAIL);
  //   const password = screen.getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
  //   const loginButton = screen.getByTestId(COMMON_LOGIN_BUTTON_LOGIN);

  //   axios.post.mockImplementation(() => Promise.resolve({ data: mockToken }));
  //   userEvent.type(email, email2);
  //   userEvent.type(password, password2);

  //   fireEvent.click(loginButton);
  //   const mockedPost = jest.spyOn(axios, 'post')
  //     .mockImplementation(() => Promise.resolve({ data: mockToken }));
  //   expect(mockedPost).toBeCalledWith('http://localhost:3001/login', { email: 'zebirita@email.com', password: '$#zebirita#$' });

  //   expect(mockedPost).toHaveBeenCalled();

  //   expect(history.location.pathname).toBe('/customer/products');
  //   expect(screen.getByText(/cliente zé birita/i)).toBeInTheDocument();
  // });
});

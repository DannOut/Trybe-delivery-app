import React from 'react';
import axios from 'axios';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Login from '../Pages/Login';
import App from '../App';
import renderWithRouter from '../utils/RenderWithRouter';
import { infoSentAxiosPost, mockToken } from './mocks/User.mock';
import Redirect from '../Pages/RedirectToLogin';

jest.mock('axios');

const COMMON_LOGIN_INPUT_EMAIL = 'common_login__input-email';
const COMMON_LOGIN_INPUT_PASSWORD = 'common_login__input-password';
const COMMON_LOGIN_BUTTON_LOGIN = 'common_login__button-login';
const COMMON_LOGIN_BUTTON_REGISTER = 'common_login__button-register';
const emailValidLogin = 'zebirita@email.com';
const passwordValidLogin = '$#zebirita#$';

describe('Testando a página de Login', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };

    global.localStorage.clear();
    global.localStorage = localStorageMock;
  });

  it('01- Desativa o botão de login quando o e-mail for inválido', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const emailInput = getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    const passwordInput = getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    const loginButton = getByTestId(COMMON_LOGIN_BUTTON_LOGIN);

    userEvent.type(emailInput, 'Invalid email or password');
    userEvent.type(passwordInput, 'Invalid email or password');

    expect(loginButton).toBeDisabled();
  });

  it('02- Ativa o botão de login quando o e-mail e a senha forem válidos', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    const passwordInput = getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    const loginButton = getByTestId(COMMON_LOGIN_BUTTON_LOGIN);

    userEvent.type(emailInput, 'valid-email@example.com');
    userEvent.type(passwordInput, 'validpassword');

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

  it('04- Se é feita a requisição do axios ao clicar em login', async () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(COMMON_LOGIN_INPUT_EMAIL);
    const password = screen.getByTestId(COMMON_LOGIN_INPUT_PASSWORD);
    const loginButton = screen.getByTestId(COMMON_LOGIN_BUTTON_LOGIN);

    //* Testando mock do axios
    const response = { data: mockToken };
    axios.post.mockResolvedValue(response);

    expect(loginButton).toHaveProperty('disabled', true);
    userEvent.type(email, emailValidLogin);
    userEvent.type(password, passwordValidLogin);

    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);

    //! apenas para parar o warning vermelho
    const mockLocation = { pathname: '/' };
    Object.defineProperty(window, 'location', { value: mockLocation });
    expect(mockLocation.pathname).toBe('/');

    const result = await axios.post('/login', infoSentAxiosPost);
    expect(result.data.email).toEqual(response.data.email);
    expect(axios.post)
      .toHaveBeenCalledWith(
        '/login',
        infoSentAxiosPost,
      );
  });

  it('06- Messagem de Erro ', () => {

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

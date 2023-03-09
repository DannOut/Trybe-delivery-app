import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../utils/RenderWithRouter';
import { Register } from '../Pages';

// const COMMON_REGISTER_INPUT_NAME = 'common_register__input-name';
const COMMON_REGISTER_INPUT_EMAIL = 'common_register__input-email';
const COMMON_REGISTER_INPUT_PASSWORD = 'common_register__input-password';
const COMMON_REGISTER_BUTTON_REGISTER = 'common_register__button-register';
// const
// COMMON_REGISTER_ELEMENT_INVALID_REGISTER = 'common_register__element-invalid_register';

describe('Testando a página de Registro', () => {
  it('Utilidades da tela.', () => {
    const { getByTestId } = renderWithRouter(<Register />);
    const registerInput = getByTestId(COMMON_REGISTER_INPUT_EMAIL);
    const passwordInput = getByTestId(COMMON_REGISTER_INPUT_PASSWORD);
    const buttonRegister = getByTestId(COMMON_REGISTER_BUTTON_REGISTER);
    const textInPage = screen.getByText('CADASTRAR');

    fireEvent.change(registerInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    expect(buttonRegister).toBeDisabled();
    expect(textInPage).toBeInTheDocument();
  });

  it('Renderiza a página.', () => {
    render(<Register />, { wrapper: MemoryRouter });
    const pageTitle = screen.getByRole('heading', { name: /cadastro/i });
    expect(pageTitle).toBeInTheDocument();
  });
});

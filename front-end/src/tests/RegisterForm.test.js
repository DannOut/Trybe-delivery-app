import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../utils/RenderWithRouter';
import RegisterForm from '../components/RegisterForm';

const ZE_BIRITA = 'zebirita@email.com';
const ADMIN_MANAGE_INPUT_NAME = 'admin_manage__input-name';
const ADMIN_MANAGE_INPUT_EMAIL = 'admin_manage__input-email';
const ADMIN_MANAGE_INPUT_PASSWORD = 'admin_manage__input-password';
const ADMIN_MANAGE_SELECT_ROLE = 'admin_manage__select-role';
const ADMIN_MANAGE_BUTTON_REGISTER = 'admin_manage__button-register';

describe('Testando o component RegisterForm', () => {
  it('01- Renderiza os inputs.', () => {
    const { getByTestId } = renderWithRouter(
      <RegisterForm getUsers={ () => {} } />,
    );

    expect(getByTestId(ADMIN_MANAGE_INPUT_NAME)).toBeInTheDocument();
    expect(getByTestId(ADMIN_MANAGE_INPUT_EMAIL)).toBeInTheDocument();
    expect(getByTestId(ADMIN_MANAGE_INPUT_PASSWORD)).toBeInTheDocument();
    expect(getByTestId(ADMIN_MANAGE_SELECT_ROLE)).toBeInTheDocument();
    expect(getByTestId(ADMIN_MANAGE_BUTTON_REGISTER)).toBeInTheDocument();
    expect(
      getByTestId('admin_manage__element-invalid-register'),
    ).toBeInTheDocument();
  });

  it('02- Atualiza os valores quando ocorre uma mudança.', () => {
    const { getByTestId } = renderWithRouter(
      <RegisterForm getUsers={ () => {} } />,
    );

    const nameInput = getByTestId(ADMIN_MANAGE_INPUT_NAME);
    const emailInput = getByTestId(ADMIN_MANAGE_INPUT_EMAIL);
    const passwordInput = getByTestId(ADMIN_MANAGE_INPUT_PASSWORD);
    const roleSelect = getByTestId(ADMIN_MANAGE_SELECT_ROLE);

    fireEvent.change(nameInput, { target: { value: 'Zé Birita' } });
    fireEvent.change(emailInput, {
      target: { value: ZE_BIRITA },
    });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(roleSelect, { target: { value: 'seller' } });

    expect(nameInput.value).toBe('Zé Birita');
    expect(emailInput.value).toBe(ZE_BIRITA);
    expect(passwordInput.value).toBe('password123');
    expect(roleSelect.value).toBe('seller');
  });

  it('03- Desativa o botão quando o formulário é inválido.', () => {
    const { getByTestId } = renderWithRouter(
      <RegisterForm getUsers={ () => {} } />,
    );

    const button = getByTestId(ADMIN_MANAGE_BUTTON_REGISTER);
    expect(button.disabled).toBe(true);
  });

  it('04- Ativa o botão quando o formulário é válido.', () => {
    const { getByTestId } = renderWithRouter(
      <RegisterForm getUsers={ () => {} } />,
    );

    const nameInput = getByTestId(ADMIN_MANAGE_INPUT_NAME);
    const emailInput = getByTestId(ADMIN_MANAGE_INPUT_EMAIL);
    const passwordInput = getByTestId(ADMIN_MANAGE_INPUT_PASSWORD);
    const roleSelect = getByTestId(ADMIN_MANAGE_SELECT_ROLE);
    const button = getByTestId(ADMIN_MANAGE_BUTTON_REGISTER);

    fireEvent.change(nameInput, { target: { value: 'Zé Birita' } });
    fireEvent.change(emailInput, {
      target: { value: ZE_BIRITA },
    });
    fireEvent.change(passwordInput, { target: { value: '$#zebirita#$' } });
    fireEvent.change(roleSelect, { target: { value: 'seller' } });

    expect(button.disabled).toBe(true);
  });
});

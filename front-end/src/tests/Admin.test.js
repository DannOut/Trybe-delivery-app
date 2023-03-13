import React from 'react';
import { screen } from '@testing-library/react';
import { Admin } from '../Pages';
import renderWithRouter from '../utils/RenderWithRouter';

describe('Testes da página Admin', () => {
  it('Deve exibir o cabeçalho da página', () => {
    renderWithRouter(<Admin />);
    const header = screen.getByText('Lista de Usuário');
    expect(header).toBeInTheDocument();
  });

  it('Os textos estão presentes na tela', () => {
    renderWithRouter(<Admin />);

    expect(screen.getByRole('heading', { name: 'Lista de Usuário' }))
      .toHaveTextContent(/Lista de Usuário/i);
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
// import axios from 'axios';
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

  // it('display a list of registered users', async () => {
  //   const mockData = [
  //     { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'user' },
  //     { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'admin' },
  //   ];

  //   const mockLoginResponse = {
  //     data: {
  //       name: 'Nome',
  //       email: 'email@email.com',
  //       role: 'administrator',
  //       token: 'token-fake',
  //     },
  //     status: 200,
  //   };

  //   jest.spyOn(global.localStorage, 'setItem').mockReturnValueOnce(mockLoginResponse);
  //   jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData, status: 200 });

  //   renderWithRouter(<Admin />);

  //   const userItem = await screen
  //     .getAllByTestId('admin_manage__element-user-table-item-number');
  //   expect(userItem.length).toBe(mockData.length);

  //   global.localStorage.clear();
  // });
});

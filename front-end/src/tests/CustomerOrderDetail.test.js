import { waitFor } from '@testing-library/react';
import CustomerOrderDetail from '../Pages/CustomerOrderDetail';
import RenderWithRouter from '../utils/RenderWithRouter';
import saleById from './mocks/CustomerOrderDetail';

describe('Testando a página de detalhes do pedido do cliente', () => {
  it('Deve exibir o botão "Marcar como Entregue"', async () => {
    const { getByText } = RenderWithRouter(<CustomerOrderDetail />, {
      route: `/orders/${saleById.id}`,
    });

    await waitFor(() => {
      expect(getByText('Marcar como Entregue')).toBeInTheDocument();
    });
  });
});

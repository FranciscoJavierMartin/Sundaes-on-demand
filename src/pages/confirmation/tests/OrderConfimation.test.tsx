import { rest } from 'msw';
import { render, screen } from '../../../test-utils/testing-library-utils';
import { ORDER_API } from '../../../constants/routes';
import { server } from '../../../mocks/server';
import OrderConfirmation from '../OrderConfirmation';

test('error response from server for submitting order', async () => {
  server.resetHandlers(
    rest.post(ORDER_API, (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(
    'An unexpected error occurred. Please try again later.'
  );
});

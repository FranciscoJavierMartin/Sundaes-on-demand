import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { SCOOPS_API, TOPPINGS_API } from '../../../constants/routes';

test('handles error for scoops and toppings route', async () => {
  server.resetHandlers(
    rest.get(SCOOPS_API, (req, res, ctx) => res(ctx.status(500))),
    rest.get(TOPPINGS_API, (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

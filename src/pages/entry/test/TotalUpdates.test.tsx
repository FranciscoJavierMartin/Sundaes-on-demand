import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';

// FIXME: Research why is failing the test
test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />, {
    wrapper: OrderDetailsProvider,
  });

  const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType='toppings' />);

  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');

  const hotFudgeCheckbox = screen.getByRole('checkbox', {
    name: 'Hot fudge',
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');

  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');
});

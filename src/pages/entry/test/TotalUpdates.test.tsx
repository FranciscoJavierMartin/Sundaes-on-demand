import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

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

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if toppings is added first', async () => {
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('3.50');

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});

import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType='scoops' />);

  const scoopImages = await screen.findAllByRole('img', {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(2);

  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each toppings option from server', async () => {
  render(<Options optionType='toppings' />);

  const scoopImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(scoopImages).toHaveLength(3);

  // @ts-ignore
  const imageTitles = scoopImages.map((element) => element.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

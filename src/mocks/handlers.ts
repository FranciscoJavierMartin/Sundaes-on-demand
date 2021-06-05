import { rest } from 'msw';
import { ORDER_API, SCOOPS_API, TOPPINGS_API } from '../constants/routes';

export const handlers = [
  rest.get(SCOOPS_API, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Chocolate',
          imagePath: '/images/chocolate.png',
        },
        {
          name: 'Vanilla',
          imagePath: '/images/vanilla.png',
        },
      ])
    );
  }),
  rest.get(TOPPINGS_API, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Cherries',
          imagePath: '/images/cherries.png',
        },
        {
          name: 'M&Ms',
          imagePath: '/images/m-and-ms.png',
        },
        {
          name: 'Hot fudge',
          imagePath: '/images/hot-fudge-png',
        },
      ])
    );
  }),
  rest.post(ORDER_API, (req, res, ctx) => {
    return res(
      ctx.json({
        orderNumber: 123456789,
      })
    );
  }),
];

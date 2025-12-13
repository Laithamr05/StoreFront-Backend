import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/auth';

const store = new OrderStore();
const routes = express.Router();

// Create a new order for a user (helper, token required)
routes.post('/', verifyAuthToken, async (req: Request, res: Response) => {
  const order = await store.create(req.body);
  res.json(order);
});

// Add product to order (helper, token required)
routes.post(
  '/:id/products',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    const orderProduct = await store.addProduct({
      order_id: parseInt(req.params.id),
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    });
    res.json(orderProduct);
  }
);

// GET /orders/current/:userId   [token required]
routes.get(
  '/current/:userId',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    const orders = await store.currentOrderByUser(
      parseInt(req.params.userId)
    );
    res.json(orders);
  }
);

// GET /orders/completed/:userId   [token required]
routes.get(
  '/completed/:userId',
  verifyAuthToken,
  async (req: Request, res: Response) => {
    const orders = await store.completedOrdersByUser(
      parseInt(req.params.userId)
    );
    res.json(orders);
  }
);

export default routes;

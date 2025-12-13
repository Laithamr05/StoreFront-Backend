import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/auth';

const store = new ProductStore();
const routes = express.Router();

// GET /products
routes.get('/', async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
});

// GET /products/:id
routes.get('/:id', async (req: Request, res: Response) => {
  const product = await store.show(parseInt(req.params.id));
  res.json(product);
});

// POST /products [token required]
routes.post('/', verifyAuthToken, async (req: Request, res: Response) => {
  const product = await store.create(req.body);
  res.json(product);
});

export default routes;

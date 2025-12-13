import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/orders';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Base routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.get('/', (_req, res) => {
  res.send('Storefront API running');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;

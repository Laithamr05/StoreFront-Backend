import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {
  async create(o: Order): Promise<Order> {
    const conn = await client.connect();
    const result = await conn.query(
      'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *',
      [o.user_id, o.status]
    );
    conn.release();
    return result.rows[0];
  }

  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    const conn = await client.connect();
    const result = await conn.query(
      'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [op.order_id, op.product_id, op.quantity]
    );
    conn.release();
    return result.rows[0];
  }

  async currentOrderByUser(userId: number): Promise<any[]> {
    const conn = await client.connect();
    const sql = `
      SELECT o.id, op.product_id, op.quantity, o.status
      FROM orders o
      JOIN order_products op ON o.id = op.order_id
      WHERE o.user_id = $1 AND o.status = 'active'
    `;
    const result = await conn.query(sql, [userId]);
    conn.release();
    return result.rows;
  }

  async completedOrdersByUser(userId: number): Promise<any[]> {
    const conn = await client.connect();
    const sql = `
      SELECT o.id, op.product_id, op.quantity, o.status
      FROM orders o
      JOIN order_products op ON o.id = op.order_id
      WHERE o.user_id = $1 AND o.status = 'complete'
    `;
    const result = await conn.query(sql, [userId]);
    conn.release();
    return result.rows;
  }
}

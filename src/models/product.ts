import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    const conn = await client.connect();
    const result = await conn.query('SELECT * FROM products');
    conn.release();
    return result.rows;
  }

  async show(id: number): Promise<Product> {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    conn.release();
    return result.rows[0];
  }

  async create(p: Product): Promise<Product> {
    const conn = await client.connect();
    const result = await conn.query(
      'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *',
      [p.name, p.price, p.category]
    );
    conn.release();
    return result.rows[0];
  }
}

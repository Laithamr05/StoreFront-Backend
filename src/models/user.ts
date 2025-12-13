import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = parseInt(process.env.SALT_ROUNDS as string);

export class UserStore {
  async index(): Promise<User[]> {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT id, first_name AS "firstName", last_name AS "lastName" FROM users'
    );
    conn.release();
    return result.rows;
  }

  async show(id: number): Promise<User> {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT id, first_name AS "firstName", last_name AS "lastName" FROM users WHERE id = $1',
      [id]
    );
    conn.release();
    return result.rows[0];
  }

  async create(u: User): Promise<User> {
    const conn = await client.connect();
    const hash = bcrypt.hashSync(u.password + pepper, saltRounds);

    const result = await conn.query(
      'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING id, first_name AS "firstName", last_name AS "lastName"',
      [u.firstName, u.lastName, hash]
    );

    conn.release();
    return result.rows[0];
  }
}

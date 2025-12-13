# StoreFront Backend Requirements

## Application Overview
Backend API supporting an online storefront with users, products, and orders.

---

## Ports
- Server port: 3000 (default)
- PostgreSQL port: 5432 (default)

If you want to use other ports, set them via your environment and update connection strings accordingly.

---

## Requirements
- Node.js v14+
- PostgreSQL (default port 5432)
- npm

---

## Environment Variables
The application reads configuration from environment variables. Example .env:

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=storefront
POSTGRES_PASSWORD=storefront_password
BCRYPT_PASSWORD=somePepperValue
SALT_ROUNDS=10
TOKEN_SECRET=your_jwt_secret
SERVER_PORT=3000

Notes:
- BCRYPT_PASSWORD is a pepper used with bcrypt hashing.
- SALT_ROUNDS should be an integer (e.g. 10).
- TOKEN_SECRET is used to sign JWT tokens.
- POSTGRES_PORT is optional if you use the default (5432).

---

## Install Packages
Install dependencies:

npm install

Common scripts:
- npm run start — start the server (production)
- npm run dev — start server in development mode (if present)
- npm test — run tests (if tests are configured)

---

## Database Setup

Example SQL to create user and databases (run in psql or a DB tool connected to your Postgres server):

-- Create user
CREATE USER storefront WITH PASSWORD 'storefront';

-- Create databases
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront;

If your Postgres runs on a non-default port, connect with the correct port (psql -h <host> -p <port> ...).

---

## Database Migration
Apply database migrations (db-migrate or your chosen tool):

node node_modules/db-migrate/bin/db-migrate up

Or, if you have an npm script configured (example):

npm run migrate

---

## Run Server
Start the server:

npm run start

The server will listen on the port defined by SERVER_PORT (default 3000).

---

## Database Schema (tables, columns and types)

Below are example CREATE TABLE statements showing the expected schema. Adjust names/types to match your migrations.

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL, -- hashed password
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active | complete
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order_Products join table
CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Adjust column names and constraints to match your code/migrations if they differ.

---

## API Endpoints (examples)
List of key endpoints the backend should expose. Update paths to match your route definitions.

Users
- GET /users
  - Description: Get a list of all users.
  - Example:
    curl -X GET http://localhost:3000/users

- GET /users/:id
  - Description: Get user by id.
  - Example:
    curl -X GET http://localhost:3000/users/1

- POST /users
  - Description: Create a new user (register).
  - Body: { "first_name": "...", "last_name": "...", "email": "...", "password": "..." }
  - Example:
    curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"first_name":"John","last_name":"Doe","password":"pass"}'

- POST /users/authenticate (or /users/login)
  - Description: Authenticate user and return JWT token.
  - Body: { "email": "...", "password": "..." }
  - Example:
    curl -X POST http://localhost:3000/users/authenticate -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"pass"}'

Products
- GET /products
  - Get all products.
  - Example: curl -X GET http://localhost:3000/products

- GET /products/:id
  - Get product by id.

- POST /products
  - Create product (usually protected).
  - Body: { "name": "...", "price": 9.99, "category": "..." }

Orders
- POST /orders
  - Create an order for a user (protected).
  - Body: { "user_id": 1, "status": "active" }
  - Example: curl -X POST http://localhost:3000/orders -H "Authorization: Bearer <token>" -d '{"user_id":1,"status":"active"}'

- GET /orders/:id
  - Get an order by id (protected).

- POST /orders/:id/products
  - Add a product to an order.
  - Body: { "product_id": 2, "quantity": 3 }
  - Example:
    curl -X POST http://localhost:3000/orders/1/products -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"product_id":2,"quantity":3}'

Notes:
- Endpoints that modify or read user-specific data should require authentication (JWT token).
- Adjust exact route names and request/response shapes to match the implemented routes in the code.

---

## Test Database
- POSTGRES_TEST_DB should be configured (example: storefront_test) and migrations run against it before running tests.
- Example test flow:
  - export NODE_ENV=test
  - export POSTGRES_DB=storefront_test
  - run migration for test DB
  - npm test

---

## Helpful Examples

Example connection string (used by some setups):
postgresql://storefront:storefront_password@localhost:5432/storefront

Example .env file entry:
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=storefront
POSTGRES_PASSWORD=storefront_password
BCRYPT_PASSWORD=secret_pepper
SALT_ROUNDS=10
TOKEN_SECRET=changeme
SERVER_PORT=3000



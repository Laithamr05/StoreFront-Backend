# StoreFront Backend API

This project is a RESTful backend API for an online storefront application.
It allows users to browse products, manage users, and create and manage orders.

The backend is built using Node.js, Express, PostgreSQL, and db-migrate.

---

## Server & Database Ports

| Service | Port |
|------|------|
| API Server | 3000 |
| PostgreSQL | 5432 |

---

## Environment Variables

Create a `.env` file in the project root:

POSTGRES_HOST=127.0.0.1  
POSTGRES_DB=storefront  
POSTGRES_TEST_DB=storefront_test  
POSTGRES_USER=storefront  
POSTGRES_PASSWORD=storefront  

BCRYPT_PASSWORD=your_bcrypt_secret  
SALT_ROUNDS=10  
TOKEN_SECRET=your_jwt_secret  

---

## Package Installation

npm install

---

## Database Setup

CREATE USER storefront WITH PASSWORD 'storefront';
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront;

---

## Run Migrations

POSTGRES_HOST=127.0.0.1 POSTGRES_DB=storefront POSTGRES_USER=storefront POSTGRES_PASSWORD=storefront node node_modules/db-migrate/bin/db-migrate up

---

## Start Server

npm run start

Server runs on: http://localhost:3000

---

## Database Schema

### users
- id: SERIAL
- first_name: VARCHAR
- last_name: VARCHAR
- password: VARCHAR

### products
- id: SERIAL
- name: VARCHAR
- price: NUMERIC
- category: VARCHAR

### orders
- id: SERIAL
- user_id: INTEGER
- status: VARCHAR

### order_products
- id: SERIAL
- order_id: INTEGER
- product_id: INTEGER
- quantity: INTEGER

---

## API Endpoints

### Products
- GET /products
- GET /products/:id
- POST /products

### Users
- POST /users
- GET /users
- GET /users/:id

### Orders
- GET /orders/current/:user_id

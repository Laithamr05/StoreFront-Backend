# StoreFront Backend API

Dear student,

The submission must contain the following information in README.md and REQUIREMENTS.md files.

These files must list all information about the application including:

- Port number for db and server.
- Environment variables.
- Package installation instructions.
- Setup db and server instructions.
- Database schema with column name and type.
- Endpoints such as GET /users.

Please include all the information and re-submit.

---

## Server & Database Ports

| Service    | Port |
|------------|------|
| API Server | 3000 |
| PostgreSQL | 5432 |

---

## Environment Variables

Create a `.env` file in the project root and set these variables (example values shown — replace with secure values):

POSTGRES_HOST=127.0.0.1  
POSTGRES_DB=storefront  
POSTGRES_TEST_DB=storefront_test  
POSTGRES_USER=storefront  
POSTGRES_PASSWORD=storefront  

BCRYPT_PASSWORD=your_bcrypt_secret  
SALT_ROUNDS=10  
TOKEN_SECRET=your_jwt_secret  

Note: If you prefer, replace `storefront`/`storefront_test` user with `full_stack_user` or another user — ensure credentials match your DB user.

---

## Package Installation

Install dependencies:

```sh
npm install
```

---

## Database Setup

Example SQL to create a dedicated database user and databases. Run these in psql (or use your preferred DB admin tool).

Database setup example

3. **Create user**
```sh
-- Create a dedicated user
CREATE USER full_stack_user WITH PASSWORD 'Pass1234';
```

Or, via SQL query (create databases):
```sql
CREATE DATABASE storefront_db;
CREATE DATABASE storefront_test_db;
```

4. **Grant all database privileges to user in both databases**
```sh
GRANT ALL PRIVILEGES ON DATABASE storefront_db TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE storefront_test_db TO full_stack_user;
```

If you use the `storefront` user from this repo, equivalent commands:
```sql
CREATE USER storefront WITH PASSWORD 'storefront';
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront;
```

---

## Run Migrations

Run db-migrate to apply migrations (example using env inline):

```sh
POSTGRES_HOST=127.0.0.1 POSTGRES_DB=storefront POSTGRES_USER=storefront POSTGRES_PASSWORD=storefront node node_modules/db-migrate/bin/db-migrate up
```

Adjust POSTGRES_* values to match your .env or custom user (e.g., `full_stack_user`).

---

## Start Server

Run the server:

```sh
npm run start
```

Server runs on: http://localhost:3000

---

## Database Schema

users
- id: SERIAL
- first_name: VARCHAR
- last_name: VARCHAR
- password: VARCHAR

products
- id: SERIAL
- name: VARCHAR
- price: NUMERIC
- category: VARCHAR

orders
- id: SERIAL
- user_id: INTEGER
- status: VARCHAR

order_products
- id: SERIAL
- order_id: INTEGER
- product_id: INTEGER
- quantity: INTEGER

---

## API Endpoints

Products
- GET /products
- GET /products/:id
- POST /products

Users
- POST /users
- GET /users
- GET /users/:id

Orders
- GET /orders/current/:user_id

---

